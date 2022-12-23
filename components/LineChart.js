import {useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2'

import moment from 'moment'


export default function PieChart({catData}) {

	const [amount,setAmount] = useState([])
	const [label,setLabel] = useState([])

	useEffect(()=>{
		setAmount(catData.map(element => element.balance))
		setLabel(catData.map(element => element.balance))
	},[catData])

	console.log(catData)

	const data = {

		labels: label, //cat,//lable for each slide
		datasets: [{
			label: 'Balance Trend',
			borderColor: 'dimgray',
			borderWidth: 2,
			data: amount,//size of the slice
			backgroundColor: "steelblue"
		}]
	}


	return (

		<Line data={data} />
	)
}