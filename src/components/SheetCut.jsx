import { Typography, Input, Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { PlusIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";


export const SheetCut = ({
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
						if(+e.target.value < 70) {
							onChangeCut(e.target.name, 70);
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
							onChangeCut(e.target.name, +maxHeight);
						}
						if(+e.target.value < 70) {
							onChangeCut(e.target.name, 70);
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
					onBlur={(e) => {
						if(+e.target.value < 1) {
							onChangeCut(e.target.name, 1);
						}
					}}
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
						<div className='flex gap-3'>
							<Button
								className="flex items-center"
								variant="outlined"
								size="sm"
								onClick={ isEditable ? onSaveCut : onEditCut }
							>
								{
									isEditable ? (
										'Save'
									) : (
										<>
											<PencilIcon className="text-blue-500 font-bold h-5 w-5 mr-2" />
											Edit
										</>
									)
								}
							</Button>
							{
								isEditable && (
									<Button
										className="flex items-center"
										variant="outlined"
										size="sm"
										color='gray'
										onClick={ onCancelEditCut }
									>
										Cancel
									</Button>
								)
							}
							<IconButton
								variant="outlined"
								color='red'
								onClick={onRemoveCut}
							>
								<XMarkIcon className="text-red-500 font-bold h-5 w-5" />
							</IconButton>
						</div>
					)
				}
			</td>
		</tr>
	)
};

