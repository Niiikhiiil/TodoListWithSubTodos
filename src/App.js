import React, { useCallback, useRef, useState } from 'react';
import { Button, Card, Form, InputGroup, ListGroup } from 'react-bootstrap';
import uuid from 'react-uuid';

const App = () => {
	const [input, setInput] = useState('');
	const [data, setData] = useState([]);
	const [mod, setMod] = useState(false);
	const [tempId, setTempid] = useState(0);

	const [subArrayInput, setSubArrayInput] = useState('');
	const [subArrayEdit, setSubArrayEdit] = useState(false);
	const [subtempIdm, setStempIdm] = useState(0);
	const [subtempIds, setStempIds] = useState(0);
	const [submod, setSubmod] = useState(false);
	const [index, setIndex] = useState(0);

	const [flag, setFlag] = useState(false);
	const inputRef = useRef();

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
		setSubArrayInput(e.target.value);
		inputRef?.current?.focus();
	});

	function handleSubInput(id, f) {
		setSubArrayEdit(!subArrayEdit);
		setStempIdm(id);
		setIndex(f);
	}

	function handleSubAddChange(e) {
		e.preventDefault();
		let o = [...data];

		if (o[index].subInput?.length > 0 || Array.isArray(o[index].subInput)) {
			o[index].subInput = [
				...o[index].subInput,
				{ mid: subtempIdm, sid: uuid(), data: subArrayInput },
			];
		}
		if (!Array.isArray(o[index].subInput)) {
			o[index].subInput = [
				{ mid: subtempIdm, sid: uuid(), data: subArrayInput },
			];
		}
		// setSubmod(!o[index].);
		handleSubInput(subtempIdm);
		setData(o);
		setSubArrayInput('');
		setIndex(0);
	}

	function handleSubbDelete(mmid, subid) {
		let subdata = [...data];
		let op = subdata.map((sub) => {
			if (sub.id == mmid) {
				sub.subInput = sub.subInput.filter((sub) => sub.sid != subid);
			}
		});
		setData(subdata);
	}

	function handleSubbModify(mmid, subid, indx) {
		setIndex(indx);
		setStempIdm(mmid);
		let d = [...data];
		let subModId = d[indx].subInput.find((si) => si.sid == subid);
		setSubArrayInput(subModId.data);
		setStempIds(subModId.sid);
		setSubmod(!submod);
		handleSubInput(mmid);
	}

	function subEditbutton(e) {
		const subarr = data;
		subarr.map((sba) => {
			if (sba.id === subtempIdm) {
				sba.subInput.map((sa) => {
					if (sa.sid == subtempIds) {
						sa.data = subArrayInput;
						setSubmod(!submod);
					}
				});
			}
		});
		handleSubInput(subtempIdm);
		setData(subarr);
		setSubArrayInput('');
		setStempIds(0);
	}

	return (
		<div>
			<center>
				<InputGroup className="mt-2 ms-2 me-2 ">
					<Form.Control
						placeholder="Enter ToDos"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						aria-describedby="basic-addon2"
					/>
					{!mod ? (
						<Button
							variant="primary"
							id="button-addon2"
							type="submit"
							onClick={(e) => handleClick(e)}
						>
							Go
						</Button>
					) : (
						<Button
							variant="secondary"
							id="button-addon2"
							onClick={(e) => editbutton(e)}
						>
							Edit
						</Button>
					)}
				</InputGroup>
				{/* <input
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
				<button onClick={(e) => editbutton(e)}>Edit</button>
			)} */}

				{subArrayEdit && (
					<>
						<InputGroup className="mt-2 ms-2 me-2 ">
							<Form.Control
								placeholder="enter sub Todos"
								value={subArrayInput}
								onChange={(e) =>
									setSubArrayInput(e.target.value)
								}
								aria-describedby="basic-addon2"
							/>
							{!submod ? (
								<Button
									variant="success"
									id="button-addon2"
									onClick={(e) => handleSubAddChange(e)}
								>
									SubAdd
								</Button>
							) : (
								<Button
									variant="outline-secondary"
									onClick={(e) => subEditbutton(e)}
								>
									SubEdit
								</Button>
							)}
						</InputGroup>

						{/* <input
						placeholder="enter sub Todos"
						value={subArrayInput}
						onChange={(e) => setSubArrayInput(e.target.value)}
					/>
					{!submod ? (
						<button onClick={(e) => handleSubAddChange(e)}>
							SubAdd
						</button>
					) : (
						<button onClick={(e) => subEditbutton(e)}>
							SubEdit
						</button>
					)} */}
					</>
				)}
				<br />
				<br />
				<br />
				<Card key={uuid()}>
					{data.length > 0 &&
						data.map((da, i) => {
							return (
								<Card.Body key={uuid()}>
									<Card.Title key={uuid()}>
										Main Todo:" {da.inputt} "
									</Card.Title>
									{da.subInput?.length > 0 &&
										(Array.isArray(da.subInput)
											? da.subInput.map((ms, j) => {
													return (
														<ListGroup
															className="list-group-flush"
															key={uuid()}
														>
															<ListGroup.Item
																key={uuid()}
															>
																{ms.data}
																<Button
																	className="ms-2"
																	variant="info"
																	key={uuid()}
																	onClick={() =>
																		handleSubbModify(
																			da.id,
																			ms.sid,
																			i,
																		)
																	}
																>
																	sub-modify
																</Button>
																<Button
																	className="ms-2"
																	variant="danger"
																	key={uuid()}
																	onClick={() =>
																		handleSubbDelete(
																			da.id,
																			ms.sid,
																			j,
																		)
																	}
																>
																	sub-Delete
																</Button>
															</ListGroup.Item>
														</ListGroup>
													);
											  })
											: null)}
									<ListGroup.Item className="d-flex flex-row justify-content-center">
										<Button
											size="sm"
											variant="outline-secondary"
											key={uuid()}
											onClick={() =>
												handleSubInput(da.id, i)
											}
										>
											add more to it
										</Button>
										<br />

										<Button
											size="sm"
											variant="info"
											key={uuid()}
											onClick={() => handleModify(da.id)}
										>
											Main-Modify
										</Button>
										<Button
											size="sm"
											variant="outline-danger"
											key={uuid()}
											onClick={() => handleDelete(da.id)}
										>
											Main-Delete
										</Button>
										<hr key={uuid()} />
									</ListGroup.Item>
								</Card.Body>
							);
						})}
				</Card>
			</center>
		</div>
	);
};

export default App;
