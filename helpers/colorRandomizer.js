const colorRandomizer = () => {


	// console.log(Math.random())
	// console.log(Math.floor(5.95)) //5
	return Math.floor(Math.random()*16777215).toString(16)
}

export {colorRandomizer}