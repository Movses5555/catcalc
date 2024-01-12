import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {
  addNewCut,
  removeCut,
  updateCut,
} from "../redux/calcReducer";

import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { PlusIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import SheetImage from "../assets/images/sheet.jpg"

import { run } from '../utils'
 
const TABLE_HEAD = ["No.", "Length (sm)", "Width (sm)", "Quantity", ""];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
 
export const Cats = () => {
	const [newCut, setNewCut] = useState({length: "", width: "", count: ""});
	const [editableCut, setEditableCut] = useState({length: "", width: "", count: ""});
	const [fitData, setFitData] = useState([]);
	const dispatch = useDispatch();
	const cuts = useSelector((state) => state.calc.cuts);
	const sheetDimensions = useSelector((state) => state.calc.sheetDimensions);

	useEffect(() => {
		let data = run();
		setFitData(data);
	}, [])
	

	const handleChangeNewCut = (name, value) => {
		setNewCut({
			...newCut,
			[name]: value
		});
	}

	const handleAddNewCut = () => {
		const data = {
			id: uuidv4(),
			...newCut,
		};
		setNewCut({length: "", width: "", count: ""});
		dispatch(addNewCut(data));
	}

	const handleRemoveCut = (id) => {
		dispatch(removeCut(id));
	}

	const handleEditCut = (id) => {
		const cut = cuts.find(item => item.id === id)
		setEditableCut(cut);
	}

	const handleChangeEditableCut = (name, value) => {
		setEditableCut({
			...editableCut,
			[name]: value
		});
	}

	const handleSaveCut = () => {
		dispatch(updateCut(editableCut));
		setEditableCut({length: "", width: "", count: ""});
	}

	console.log('====================================');
	console.log('');
	console.log('fitData=========', fitData);
	console.log('====================================');
	
	const colors =  [ 
		"#F00", "#95CBE9", "#024769", "#AFD775", "#2C5700", "#DE9D7F", "#7F9DDE", "#00572C", "#75D7AF", "#694702", "#E9CB95", "#79D2EF",
		"#F00", "#95CBE9", "#024769", "#AFD775", "#2C5700", "#DE9D7F", "#7F9DDE", "#00572C", "#75D7AF", "#694702", "#E9CB95", "#79D2EF",
		"#F00", "#95CBE9", "#024769", "#AFD775", "#2C5700", "#DE9D7F", "#7F9DDE", "#00572C", "#75D7AF", "#694702", "#E9CB95", "#79D2EF",
		"#F00", "#95CBE9", "#024769", "#AFD775", "#2C5700", "#DE9D7F", "#7F9DDE", "#00572C", "#75D7AF", "#694702", "#E9CB95", "#79D2EF",
	];
	
  	return (
    	<div className="p-20">
      		<Card className="h-full w-full">
        		<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{
								TABLE_HEAD.map((head) => (
									<th
										key={head}
										className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
									>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal leading-none opacity-70"
										>
											{head}
										</Typography>
									</th>
								))
							}
						</tr>
					</thead>
					<tbody>
						{
							cuts.map((item, index) => {
								const isEditable = item.id === editableCut.id;
								console.log('isEditable', isEditable)
								return (
									<CatItem
										key={ item.id }
										index={ index }
										maxLength={ sheetDimensions.length }
										maxWidth={ sheetDimensions.width }
										length={isEditable ? editableCut.length : item.length}
										width={isEditable ? editableCut.width : item.width}
										count={isEditable ? editableCut.count : item.count}
										isEditable={isEditable}
										onChangeCut={isEditable ? handleChangeEditableCut : handleChangeNewCut}
										onRemoveCut={() => handleRemoveCut(item.id)}
										onEditCut={() => handleEditCut(item.id)}
										onSaveCut={() => handleSaveCut(item.id)}
									/>
								)
							})
						}
						<CatItem 
							isLast
							maxLength={ sheetDimensions.length }
							maxWidth={ sheetDimensions.width }
							length={newCut.length}
							width={newCut.width}
							count={newCut.count}
							isDisabled={ !newCut.length || !newCut.width || !newCut.count }
							onChangeCut={handleChangeNewCut}
							onAddNewCut={handleAddNewCut}
						/>
					</tbody>
				</table>
			</Card>
			<Sheets
				fitData={fitData}
				colors={colors}
				width={sheetDimensions.width}
				height={sheetDimensions.height}
			/>
		</div>
  	);
}

const CatItem = ({
	isLast,
	index,
	maxLength,
	maxWidth,
	length,
	width,
	count,
	isDisabled,
	isEditable,
	onChangeCut,
	onAddNewCut,
	onRemoveCut,
	onEditCut,
	onSaveCut,
}) => {
	let classes = !!isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
	return (
		<tr>
			<td className={classes}>
				<Typography
					variant="small"
					color="blue-gray"
					className="font-normal leading-none opacity-70"
				>
				{ !!isLast ? '' : index + 1}
				</Typography>
			</td>
			<td className={classes}>
				<Input
					label="Length"
					type="number"
					name='length'
					value={ length }
					min={1}
					max={maxLength}
					disabled={!isLast && !isEditable}
					onBlur={() => {}}
					onChange={(e) => onChangeCut(e.target.name, e.target.value)}
				/>
			</td>
			<td className={classes}>
				<Input
					label="Width"
					type="number"
					name='width'
					value={ width }
					min={1}
					max={maxWidth}
					disabled={!isLast && !isEditable}
					onChange={(e) => onChangeCut(e.target.name, e.target.value)}
				/>
			</td>
			<td className={classes}>
				<Input
					label="Quantity"
					name='count'
					min={1}
					value={count}
					disabled={!isLast && !isEditable}
					onChange={(e) => onChangeCut(e.target.name, e.target.value)}
				/>
			</td>
			<td className={classes}>
				{
					isLast ? (
						<Button
							className="flex items-center gap-2"
							variant="outlined"
							size="sm"
							disabled={!!isDisabled}
							onClick={onAddNewCut}
						>
							<PlusIcon className="text-blue-500 font-bold h-5 w-5" />
							Add
						</Button>
					) : (
						<div className='flex gap-2'>
							<Button
								className="flex items-center gap-2"
								variant="outlined"
								size="sm"
								onClick={ isEditable ? onSaveCut : onEditCut }
							>
								{
									isEditable ? (
										'Save'
									) : (
										<>
											<PencilIcon className="text-blue-500 font-bold h-5 w-5" />
											Edit
										</>
									)
								}
							</Button>
							<IconButton
								variant="outlined"
								onClick={onRemoveCut}
							>
								<XMarkIcon className="text-blue-500 font-bold h-5 w-5" />
							</IconButton>
						</div>
					)
				}
			</td>
		</tr>
	)
};

const Sheets = ({
	fitData,
	colors,
	width,
	height,
}) => {
	return (
		<div className="py-20">
			<div className="flex justify-center text-3xl font-bold">
				Sheet dimensions (sm): {width} x {height}
			</div>
			{
				fitData.map((sheet, index) => {
					return (
						<div>
							<div className='mb-4'>
								<span className='text-3xl font-bold'>Sheet {index + 1}</span>
							</div>
							<Card
								key={index.toString()}
								style={{
									height: `${height}px`,
									width: `${width}px`,
									background: `url(${SheetImage})`
								}}
								className={`h-[${height}px] w-[${width}px] rounded-none bg-blue-gray-50 relative mb-20`}
							>
								{
									sheet.map((item, index) => {
										console.log('item===========', item)
										return (
											<div
												key={item.id + index}
												style={{
													height: `${item.h}px`,
													width: `${item.w}px`,
													background: colors[index],
													position: 'absolute',
													left: item.fit?.x,
													top: item.fit?.y,
												}}
												className='flex items-center justify-center text-3xl'
												// className={`w-[${item.width}px] h-[${item.width}px] bg-[${colors[index]}]`}
											>
												{item.w} x {item.h}
											</div>
										)
									})
								}
							</Card>
						</div>
					)
				})
			}
		</div>
	)
}
