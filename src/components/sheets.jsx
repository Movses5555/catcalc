import { useRef } from 'react';
import SheetImage from "../assets/images/sheet.jpg";


export const Sheets = ({
	fitData,
	width,
	height,
}) => {
	const sheetRef = useRef();
	const sheetPaddingTop = ((height / width) * 100).toFixed(2);
	return (
		<div className="pt-20">
			{
				fitData.map((sheet, index) => {
					return (
						<div
							key={index.toString()}
							className='w-full mb-20'
						>
							<div className='mb-4'>
								<span className='text-3xl font-bold'>Sheet {index + 1}</span>
							</div>
							<div
								ref={sheetRef}
								style={{
									paddingTop: `${sheetPaddingTop}%`,
									backgroundImage: `url(${SheetImage})`,
								}}
								className='relative bg-cover w-full h-auto min-h-14 min-w-full'
							>
								{
									sheet.map((item, index) => {
										let sheetCurrentWidth = sheetRef.current?.clientWidth;
										const rate = width / sheetCurrentWidth;
										let itemHeight = Math.floor(item.h / rate);
										let itemWidth = Math.floor(item.w / rate);
										return (
											<div
												key={item.id + index}
												style={{
													height: `${itemHeight}px`,
													width: `${itemWidth}px`,
													left: item.fit?.x / rate,
													top: item.fit?.y / rate,
													backgroundColor: "rgba(255, 0, 0, 0.3)",
												}}
												className='flex items-center justify-center text-3xl absolute '
											>
												<span className='text-xs'>{item.w} x {item.h}</span>
											</div>
										)
									})
								}
							</div>
						</div>
					)
				})
			}
		</div>
	)
};
