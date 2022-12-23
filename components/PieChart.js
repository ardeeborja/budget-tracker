import {Fragment} from 'react'
import {useState,useEffect} from 'react'
import {Pie} from 'react-chartjs-2'

import {colorRandomizer} from '../helpers/colorRandomizer'

import randomcolor from 'randomcolor'

export default function PieChart({catData}){

	console.log(catData)
	// console.log(`#${colorRandomizer}`)
	console.log(colorRandomizer())//returns hex  which we can use as html colors


	const [cat,setCat] = useState([])
	const [amount,setAmount] = useState([])
	const [randomBGColors,setRandomBGColors] = useState([])

	useEffect(()=>{
		//segregate cat and amount into their respective array which will be used in the pie chart
		setCat(catData.map(element => element.name))
		setAmount(catData.map(element => element.amount))
		// setRandomBGColors(catData.map(() => `#${colorRandomizer()}`))
		setRandomBGColors(catData.map(() => randomcolor() ))

	},[catData])


	console.log(cat)//all distinct cat
	console.log(amount)//amount per distinct brand
	// console.log(randomBGColors)

	const data = {

		labels: cat,//lable for each slide
		datasets: [{
			data: amount,//size of the slice
			backgroundColor: randomBGColors
		}]
	}

	return (
		
		<Pie data={data} />
		
	)
}