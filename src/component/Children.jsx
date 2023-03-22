import React, { memo } from 'react';
import uuid from 'react-uuid';

const Children = ({
	da,
	subArrayInput,
	setSubArrayInput,
	submod,
	handleSubAddChange,
	i,
	subEditbutton,
	ids,
    subInputChange,inputRef
}) => {
	return (
		<div>
			{da ? (
				<React.Fragment key={uuid()}>
					<input
						key="password"
						// key={'editor1'}
						ref={inputRef}
						placeholder="Enter sub ToDos"
						value={subArrayInput}
						onChange={
                            subInputChange
                        //     (e) => {
						// 	setSubArrayInput(e.target.value);
						// 	// changeInput(e);
						// }
                    }
					/>
					{!submod ? (
						<button
							key={uuid()}
							onClick={(e) => handleSubAddChange(e, ids, i)}
						>
							subAdd
						</button>
					) : (
						<button
							key={uuid()}
							onClick={(e) => subEditbutton(e, ids, i)}
						>
							subEdit
						</button>
					)}
				</React.Fragment>
			) : null}
		</div>
	);
};

export default memo(Children);
