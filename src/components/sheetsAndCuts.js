import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {
  addNewCut,
  removeCut,
  updateCut,
	updateCattingSheetsCount,
} from "../redux/calcSheetsReducer";
import { Cutting } from '../utils';
import { Sheets } from './sheets';
import { SheetCut } from './SheetCut';
import { Card, Typography } from "@material-tailwind/react";

 
const TABLE_HEAD = ["No.", "Length (sm)", "Width (sm)", "Quantity", ""];
 
export const SheetsAndCuts = () => {
	const [newCut, setNewCut] = useState({height: "", width: "", count: ""});
	const [editableCut, setEditableCut] = useState({height: "", width: "", count: ""});
	const [fitData, setFitData] = useState([]);
	const dispatch = useDispatch();
	const cuts = useSelector((state) => state.calcSheets.cuts);
	const sheetDimensions = useSelector((state) => state.calcSheets.sheetDimensions);

	useEffect(() => {
		let data = Cutting([...cuts]);
		setFitData(data);
		dispatch(updateCattingSheetsCount(data.length));
	}, [cuts, dispatch])
	

	const handleChangeNewCut = (name, value) => {
		let val = value;
		if(isNaN(value) || value === 0) {
			val = '';
		}
		setNewCut({
			...newCut,
			[name]: val
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
		let val = value;
		if(isNaN(value) || value === 0) {
			val = '';
		}
		setEditableCut({
			...editableCut,
			[name]: val
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
									<SheetCut
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
						<SheetCut
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
};

