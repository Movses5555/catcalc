import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {
  addNewCut,
  removeCut,
  updateCut,
} from "../redux/calcReducer";
import { run } from '../utils'

import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { PlusIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import SheetImage from "../assets/images/sheet.jpg"

 
const TABLE_HEAD = ["No.", "Length (sm)", "Width (sm)", "Quantity", ""];
 
export const Cats = () => {
	const [newCut, setNewCut] = useState({height: "", width: "", count: ""});
	const [editableCut, setEditableCut] = useState({height: "", width: "", count: ""});
	const [fitData, setFitData] = useState([]);
	const dispatch = useDispatch();
	const cuts = useSelector((state) => state.calc.cuts);
	const sheetDimensions = useSelector((state) => state.calc.sheetDimensions);

	useEffect(() => {
		let data = run([...cuts]);
		setFitData(data);
	}, [cuts])
	

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
		setNewCut({height: "", width: "", count: ""});
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

	const handleCancelEditCut = () => {
		setEditableCut({height: "", width: "", count: ""});
	}

	const handleSaveCut = () => {
		dispatch(updateCut(editableCut));
		setEditableCut({height: "", width: "", count: ""});
	}
	
  	return (
    	<div className="p-10 xl:p-20">
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
								return (
									<CatItem
										key={ item.id }
										index={ index }
										maxHeight={ sheetDimensions.height }
										maxWidth={ sheetDimensions.width }
										height={isEditable ? editableCut.height : item.height}
										width={isEditable ? editableCut.width : item.width}
										count={isEditable ? editableCut.count : item.count}
										isEditable={isEditable}
										onChangeCut={isEditable ? handleChangeEditableCut : handleChangeNewCut}
										onRemoveCut={() => handleRemoveCut(item.id)}
										onEditCut={() => handleEditCut(item.id)}
										onSaveCut={() => handleSaveCut(item.id)}
										onCancelEditCut={handleCancelEditCut}
									/>
								)
							})
						}
						<CatItem 
							isLast
							maxHeight={ sheetDimensions.height }
							maxWidth={ sheetDimensions.width }
							height={newCut.height}
							width={newCut.width}
							count={newCut.count}
							isDisabled={ !newCut.height || !newCut.width || !newCut.count }
							onChangeCut={handleChangeNewCut}
							onAddNewCut={handleAddNewCut}
						/>
					</tbody>
				</table>
			</Card>
			<Sheets
				fitData={fitData}
				width={sheetDimensions.width}
				height={sheetDimensions.height}
			/>
		</div>
  	);
}

const CatItem = ({
	isLast,
	index,
	maxHeight,
	maxWidth,
	height,
	width,
	count,
	isDisabled,
	isEditable,
	onChangeCut,
	onAddNewCut,
	onRemoveCut,
	onEditCut,
	onSaveCut,
	onCancelEditCut,
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
					name='width'
					value={ width }
					min={1}
					max={maxWidth}
					disabled={!isLast && !isEditable}
					onBlur={(e) => {
						if(+e.target.value > +maxWidth) {
							onChangeCut(e.target.name, +maxWidth)
						}
					}}
					onChange={(e) => onChangeCut(e.target.name, +e.target.value)}
				/>
			</td>
			<td className={classes}>
				<Input
					label="Width"
					type="number"
					name='height'
					value={ height }
					min={1}
					max={maxHeight}
					disabled={!isLast && !isEditable}
					onBlur={(e) => {
						if(+e.target.value > +maxHeight) {
							onChangeCut(e.target.name, +maxHeight)
						}
					}}
					onChange={(e) => onChangeCut(e.target.name, +e.target.value)}
				/>
			</td>
			<td className={classes}>
				<Input
					label="Quantity"
					name='count'
					min={1}
					value={count}
					disabled={!isLast && !isEditable}
					onChange={(e) => onChangeCut(e.target.name, +e.target.value)}
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
							{
								isEditable && (
									<Button
										className="flex items-center gap-2"
										variant="text"
										size="sm"
										onClick={ onCancelEditCut }
									>
										Cancel
									</Button>
								)
							}
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
	width,
	height,
}) => {
	return (
		<div className="py-20">
			{
				fitData.map((sheet, index) => {
					return (
						<div className='w-full'>
							<div className='mb-4'>
								<span className='text-3xl font-bold'>Sheet {index + 1}</span>
							</div>
							<Card
								key={index.toString()}
								style={{
									height: `${height/3}px`,
									width: `${width/3}px`,
									// width: `100%`,
									background: `url(${SheetImage})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover'
								}}
								className={`h-[${height/3}px] w-[${width/3}px] rounded-none bg-blue-gray-50 relative mb-20`}
							>
								{
									sheet.map((item, index) => {
										return (
											<div
												key={item.id + index}
												style={{
													height: `${item.h/3}px`,
													width: `${item.w/3}px`,
													backgroundColor: "rgba(255, 0, 0, 0.3)",
													position: 'absolute',
													left: item.fit?.x/3,
													top: item.fit?.y/3,
												}}
												className='flex items-center justify-center text-3xl'
												// className={`w-[${item.width}px] h-[${item.width}px] bg-[${colors[index]}]`}
											>
												<span className='text-xs'>{item.w} x {item.h}</span>
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
