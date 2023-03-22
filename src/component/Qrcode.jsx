import React, { useState } from 'react';

const Qrcode = () => {
	const [input, setInput] = useState('');
  const [text,setText]=useState('');
	const [url, setUrl] = useState();

	function handleChange(e) {
		setInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (input) {
			setUrl(
				`http://api.qrserver.com/v1/create-qr-code/?data=${input}&size=300x300`,
			);
      setText(input)
      setInput("");
		}
	}

	return (
		<div>
			<h2>QR code Generator</h2>
			<div>
				<input
					type="text"
					value={input}
					onChange={(e) => handleChange(e)}
					placeholder="Enter word to create qr code..."
				/>
				<button
					type="submit"
					onClick={(e) => handleSubmit(e)}
				>
					Go
				</button>
			</div><br/>
      <br/>
			<div>
        <h2>{text}</h2><br/>
				<img
					src={url}
				/>
			</div>
		</div>
	);
};

export default Qrcode;
