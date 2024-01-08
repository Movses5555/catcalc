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
							TABLE_ROWS.map(({ name, job, date }, index) => {
								return (
									<CatItem
										key={ name }
										index={ index }
									/>
								)
							})
						}
						<CatItem 
							isLast
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
					className="max-w-24"
				/>
			</td>
			<td className={classes}>
				<Input
					label="Width"
					className="max-w-24"
				/>
			</td>
			<td className={classes}>
				<Input
					label="Quantity"
					className="max-w-24"
					value={15}
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
