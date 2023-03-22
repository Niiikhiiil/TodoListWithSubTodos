import React, { useCallback, useRef, useState } from 'react';
import uuid from 'react-uuid';
import Children from './Children';

const Apk = () => {
	const [input, setInput] = useState('');
	const [data, setData] = useState([]);
	const [mod, setMod] = useState(false);
	const [tempId, setTempid] = useState(0);

	const [subArrayInput, setSubArrayInput] = useState('');
	const [subArrayEdit, setSubArrayEdit] = useState(false);
	const [subtempIdm, setStempIdm] = useState(0);
	const [subtempIds, setStempIds] = useState(0);
	const [submod, setSubmod] = useState(false);

	const [flag, setFlag] = useState(false);
	const inputRef = useRef();

	// useEffect(() => {
	// 	inputRef.current.focus();
	// 	console.log(inputRef.current);
	// }, []);

	// function changeInput(e) {
	// 	e.preventDefault();
	// 	inputRef.current.focus();
	// }

	function handleClick(e) {
		if (input) {
			setData([
				...data,
				{ id: uuid(), inputt: input, subi: false, subInput: null },
			]);
			setInput('');
		}
	}

	function handleDelete(id) {
		let data2 = data.filter((m) => m.id !== id);
		return setData(data2);
	}

	function handleModify(id) {
		console.log(id);
		let modId = data.find((d) => d.id === id);
		setInput(modId.inputt);
		setTempid(modId.id);
		setMod(!mod);
	}

	function editbutton() {
		const mdd = data;
		mdd.map((m) => {
			if (m.id == tempId) {
				m.inputt = input;
				setMod(!mod);
			}
		});
		setData(mdd);
		setInput('');
		setTempid(0);
	}

	// -----------------------------sub input Operation--------------------------

	const subInputChange = useCallback((e) => {
	setSubArrayInput(e.target.value)
	inputRef?.current?.focus();}
	);

	function handleSubInput(id) {
		let o = [...data];
		let k = o.map((m) => {
			if (m.id == id) {
				m.subi = flag;
			}
		});
		setData(o);
		setFlag(!flag);
	}

	function handleSubAddChange(e, pid, index) {
		e.preventDefault();
		let o = [...data];

		if (o[index].subInput?.length > 0 || Array.isArray(o[index].subInput)) {
			o[index].subInput = [
				...o[index].subInput,
				{ mid: pid, sid: uuid(), data: subArrayInput },
			];
		}
		if (!Array.isArray(o[index].subInput)) {
			o[index].subInput = [
				{ mid: pid, sid: uuid(), data: subArrayInput },
			];
		}
		// setSubmod(!o[index].);
		handleSubInput(pid);
		setData(o);
		setSubArrayInput('');
	}

	function handleSubbDelete(mmid, subid) {
		console.log(mmid, subid);
		let subdata = [...data];

		let op = subdata.map((sub) => {
			if (sub.id == mmid) {
				sub.subInput = sub.subInput.filter((sub) => sub.sid != subid);
			}
		});

		setData(subdata);
	}

	function handleSubbModify(mmid, subid, index) {
		let d = [...data];
		let subModId = d[index].subInput.find((si) => si.sid == subid);
		setSubArrayInput(subModId.data);
		setStempIds(subModId.sid);
		setSubmod(!submod);
		handleSubInput(mmid);
	}

	function subEditbutton(e, id, index) {
		const subarr = data;
		subarr[index].subInput.map((sa) => {
			if (sa.sid == subtempIds) {
				sa.data = subArrayInput;
				setSubmod(!submod);
			}
		});
		handleSubInput(id);
		setData(subarr);
		setSubArrayInput('');
		setStempIds(0);
	}

	return (
		<div>
			<input
				placeholder="Enter ToDos"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>

			{!mod ? (
				<button
					type="submit"
					onClick={(e) => handleClick(e)}
				>
					Go
				</button>
			) : (
				<button onClick={(e) => editbutton()}>Edit</button>
			)}

			<br />
			<br />
			<br />
			<div key={uuid()}>
				{data.length > 0 &&
					data.map((da, i) => {
						return (
							<div key={uuid()}>
								<p key={uuid()}>{da.inputt}</p>
								{da.subInput?.length > 0 &&
									(Array.isArray(da.subInput)
										? da.subInput.map((ms, j) => {
												return (
													<div key={uuid()}>
														<p key={uuid()}>
															{ms.data}
														</p>
														<button
															key={uuid()}
															onClick={() =>
																handleSubbModify(
																	da.id,
																	ms.sid,
																	i,
																)
															}
														>
															modify
														</button>
														<button
															key={uuid()}
															onClick={() =>
																handleSubbDelete(
																	da.id,
																	ms.sid,
																	j,
																)
															}
														>
															Delete
														</button>
													</div>
												);
										  })
										: null)}
								{/* {da.subi ? (
									<React.Fragment key={uuid()}>
										<input
											key={uuid()}
											// key={'editor1'}
											ref={inputRef}
											value={subArrayInput}
											onChange={(e) => {
												setSubArrayInput(
													e.target.value,
												);
												changeInput(e);
											}}
										/>
										{!submod ? (
											<button
												key={uuid()}
												onClick={(e) =>
													handleSubAddChange(
														e,
														da.id,
														i,
													)
												}
											>
												subAdd
											</button>
										) : (
											<button
												key={uuid()}
												onClick={(e) =>
													subEditbutton(e, da.id, i)
												}
											>
												subEdit
											</button>
										)}
									</React.Fragment>
								) : null} */}

								<Children
									da={da.subi}
									subArrayInput={subArrayInput}
									setSubArrayInput={setSubArrayInput}
									submod={submod}
									handleSubAddChange={handleSubAddChange}
									i={i}
									subEditbutton={subEditbutton}
									ids={da.id}
									subInputChange={subInputChange}
									inputRef={inputRef}
								/>

								<button
									key={uuid()}
									onClick={() => handleSubInput(da.id)}
								>
									add more to it
								</button>
								<br />

								<button
									key={uuid()}
									onClick={() => handleModify(da.id)}
								>
									Modify
								</button>
								<button
									key={uuid()}
									onClick={() => handleDelete(da.id)}
								>
									Delete
								</button>
								<hr key={uuid()} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Apk;
