import React, { useMemo } from 'react';
const ActionEditor = ({ goToStart, goUp10, goUp, deleteTime, goDown, goDown10, goToEnd }) => {
	const actionEditor = useMemo(() => (
	<div>
		<button
		style={{
		marginBottom: 15,
		}}
		onClick={goToStart}
		>
			Start
		</button>
		<button
		style={{marginBottom: 15}}
		onClick={goUp10}>
			Up10
		</button>
		<button
		style={{
		marginBottom: 15,
		}}
		onClick={goUp}
		>
		Up
		</button>
		<button
		style={{
		marginBottom: 15,
		}}
		onClick={deleteTime}
		>
		Delete
		</button>
		<button
		style={{
		marginBottom: 15,
		}}
		onClick={goDown}
		>
		Down
		</button>
		<button
		style={{
		marginBottom: 15,
		}}
		onClick={goDown10}
		>
		Down10
		</button>
		<button
		style={{
		marginBottom: 15,
		}}
		onClick={goToEnd}
		>
		End
		</button>
	</div>
	), [goToStart, goUp10, goUp, deleteTime, goDown, goDown10, goToEnd]);
		return actionEditor;
	};

export default ActionEditor;