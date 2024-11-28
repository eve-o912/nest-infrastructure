const hre=require("hardhat");

async function main() {
    await hre.run('compile')

    await hre.run.ethers.contracts('compile')
    const Lock= await hre.ethers.getcontractfactory('Lock');
    const lock= await Lock.deploy();
    await lock.waitfordeployment();

    console.log('Lock contract Address',await lock.getAddress())
    }
    main().then()