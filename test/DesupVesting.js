const { expect } = require('chai');

describe('DesupTokenVesting', function () {
  let DesupToken;
  let testToken;
  let DesupTokenVesting;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async function () {
    // deploy desup token contract
    DesupToken = await ethers.getContractFactory('DesupToken');
    // deploy desup token vesting contract
    DesupTokenVesting = await ethers.getContractFactory(
      'MockDesupTokenVesting'
    );
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    testToken = await DesupToken.deploy(5000000000000000000000000000n);
    //so owner's balance is 5000000000000000000000000000n, right
    await testToken.deployed();
  });

  describe('Desup Vesting', function () {
    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await testToken.balanceOf(owner.address);
      expect(await testToken.totalSupply()).to.equal(ownerBalance);
    });

    it('Admin should be able to set Vesting Schedule', async function () {
      // deploy vesting contract
      const tokenVesting = await DesupTokenVesting.deploy(testToken.address);
      await tokenVesting.deployed();

      // set vesting schedule
      const vesting_schedule = {
        role: 0,
        duration: 31556926,
        init_percentage: 3,
      };

      await tokenVesting.setVestingSchedule(
        vesting_schedule.role,
        vesting_schedule.duration,
        vesting_schedule.init_percentage
      );

      // get vesting schedule
      const vs = await tokenVesting.getVestingSchedule(vesting_schedule.role);

      expect(vs.duration).equal(vesting_schedule.duration);
      expect(vs.init_percentage).equal(vesting_schedule.init_percentage);
    });

    it('User should be in holder_list after he invests, total balance check', async function () {
      // deploy vesting contract
      const tokenVesting = await DesupTokenVesting.deploy(testToken.address);
      await tokenVesting.deployed();

      // return false before invest
      expect(await tokenVesting.isInHolderlists(addr1.address)).to.not.equal(
        true
      );

      // // buy 10 ** 3 desup for 10 ^ -15 eth
      // let trx = await tokenVesting.connect(addr1).invest({
      //   value: ethers.utils.parseEther('0.0000000000000001'),
      // });

      // const isHolder = await tokenVesting.isInHolderlists(addr1.address);
      // expect(isHolder).to.equal(true);

      // we should check once we deploy our contract
      // expect(
      //   (await tokenVesting.getTotalAmount(addr1.address)).toString()
      // ).to.equal('1000');
    });

    it('Can not get allowed amount before token is published, vesting_schedule check', async function () {
      // deploy vesting contract
      const tokenVesting = await DesupTokenVesting.deploy(testToken.address);
      await tokenVesting.deployed();

      let available_amount = tokenVesting.getAllowedAmount(addr1.address);
      await expect(available_amount).to.be.revertedWith(
        'Token is not published yet'
      );

      await tokenVesting.publishToken();
      available_amount = tokenVesting.getAllowedAmount(addr1.address);
      await expect(available_amount).to.be.revertedWith(
        'Vesting Schedule is not set yet'
      );
    });

    // describe('Allowed amount, Withdraw, Available amount', async function () {
    //   let tokenVesting;
    //   const vs = {
    //     role: 'INVESTOR',
    //     duration: 24 * 60 * 60 * 365, //1yr
    //     init_percentage: 3,
    //   };

    //   beforeEach(async function () {
    //     // deploy vesting contract
    //     tokenVesting = await DesupTokenVesting.deploy(testToken.address);

    //     await tokenVesting.deployed();
    //     testToken.transfer(tokenVesting.address, '10000000');

    //     await tokenVesting.setVestingSchedule(
    //       vs.role,
    //       vs.duration,
    //       vs.init_percentage
    //     );
    //   });

    //   // it('Allowed amount check', async function () {
    //   //   // buy 1000 desup for 10 ^ -15 eth
    //   //   await tokenVesting.connect(addr1).invest({
    //   //     value: ethers.utils.parseEther('0.0000000000000001'),
    //   //   });

    //   //   const isHolder = await tokenVesting.isInHolderlists(addr1.address);
    //   //   expect(isHolder).to.equal(true);

    //   //   await tokenVesting.publishToken();

    //   //   let allowed_amount = await tokenVesting.getAllowedAmount(addr1.address);
    //   //   expect(allowed_amount).to.equal((1000 * vs.init_percentage) / 100);

    //   //   let move_back_time = 24 * 60 * 60 * 31 * 4; // 4 months
    //   //   await tokenVesting.movePublishedDateBack(move_back_time);
    //   //   allowed_amount = await tokenVesting.getAllowedAmount(addr1.address);
    //   //   expect(allowed_amount).to.equal(
    //   //     (1000 *
    //   //       Math.floor(
    //   //         vs.init_percentage +
    //   //           ((100 - vs.init_percentage) * move_back_time) / vs.duration
    //   //       )) /
    //   //       100
    //   //   );

    //   //   move_back_time = 24 * 60 * 60 * 31 * 8; // 8 months => total 1 yr
    //   //   await tokenVesting.movePublishedDateBack(move_back_time);
    //   //   allowed_amount = await tokenVesting.getAllowedAmount(addr1.address);
    //   //   expect(allowed_amount).to.equal(1000);
    //   // });

    //   // it('Withdraw check', async function () {
    //   //   // buy 1000 desup for 10 ^ -15 eth
    //   //   await tokenVesting.connect(addr1).invest({
    //   //     value: ethers.utils.parseEther('0.0000000000000001'),
    //   //   });

    //   //   await tokenVesting.publishToken();

    //   //   let allowed_amount = await tokenVesting.getAllowedAmount(addr1.address);
    //   //   expect(allowed_amount).to.equal((1000 * vs.init_percentage) / 100);

    //   //   let withdraw_result = tokenVesting.connect(addr2).withdraw(1000);
    //   //   await expect(withdraw_result).to.be.revertedWith(
    //   //     'Only holders can withdraw'
    //   //   );

    //   //   // withdraw_result = tokenVesting.connect(addr1).withdraw(1000);
    //   //   // await expect(withdraw_result).to.be.revertedWith('Withdraw limitation');

    //   //   // allowed_amount = await tokenVesting.getAllowedAmount(addr1.address);

    //   //   // we need to check once we deploy our contract
    //   //   // expect(allowed_amount.toString()).to.equal('30');

    //   //   // this line withdraw(10)
    //   //   // await tokenVesting.connect(addr1).withdraw(10);
    //   //   // const withdrawed_amount = await tokenVesting.getWithdrawedAmount(
    //   //   //   addr1.address
    //   //   // );
    //   //   // expect(withdrawed_amount).to.equal('10');
    //   //   // let available_amount = await tokenVesting.getAvailableAmount(
    //   //   //   addr1.address
    //   //   // );
    //   //   // expect(available_amount.toString()).to.equal('20');
    //   // });
    // });

    // it('Should be able to get latest ether price', async function () {
    //   // deploy vesting contract
    //   const tokenVesting = await DesupTokenVesting.deploy(testToken.address);
    //   await tokenVesting.deployed();
    //   //const ether_price = await tokenVesting.getLatestPrice();
    //   //expect(ether_price).to.not.equal(0);
    // });
  });
});
