import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {
  addNewCut
} from "../redux/calcReducer";

import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
 
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
 
export function Cats() {
	const [newCut, setNewCut] = useState({length: "", width: "", count: ""});
	const dispatch = useDispatch();
  const cuts = useSelector((state) => state.calc.cuts);
  const sheetDimensions = useSelector((state) => state.calc.sheetDimensions);

	

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

	console.log('====================================');
	console.log('newCut', newCut);
	console.log('cuts', cuts);
	console.log('====================================');
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
								return (
									<CatItem
										key={ item.id }
										index={ index }
										maxLength={ sheetDimensions.length }
										maxWidth={ sheetDimensions.width }
										length={item.length}
										width={item.width}
										count={item.count}
										onChangeCut={handleChangeNewCut}
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
	onChangeCut,
	onAddNewCut,
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
				{ !!isLast ? null : index + 1}
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
					onChange={(e) => onChangeCut(e.target.name, e.target.value)}
				/>
			</td>
			<td className={classes}>
				<Input
					label="Quantity"
					name='count'
					min={1}
					value={count}
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
							loading={false}
							disabled={!!isDisabled}
							onClick={onAddNewCut}
						>
							<PlusIcon className="text-blue-500 font-bold h-5 w-5" />
							Add
						</Button>
					) : (
						<Button
							className="flex items-center gap-2"
							variant="outlined"
							size="sm"
							loading={false}
						>
							<PencilIcon className="text-blue-500 font-bold h-5 w-5" />
							Edit
						</Button>
					)
				}
			</td>
		</tr>
	)
}
