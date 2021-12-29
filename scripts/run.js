const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners()
	const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
	const waveContract = await waveContractFactory.deploy()
	await waveContract.deployed()

	console.log('Contract deployed to:', waveContract.address)
	console.log('Contract deployed by:', owner.address)

	let waveCount
	waveCount = await waveContract.getTotalWaves()

	let waveTxn = await waveContract.wave()
	await waveTxn.wait()

	waveCount = await waveContract.getTotalWaves()

	waveTxn = await waveContract.connect(randomPerson).wave()
	await waveTxn.wait()

	waveCount = await waveContract.getTotalWaves()

	console.log('Wave count:', waveCount)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runMain()

// WavePortal address:  0x4F23B7E9aA2e1b3fB8C6f5F65a39acB9499729e7
