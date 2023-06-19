import React from 'react'
import Key from '../Key/Key';

import "./keyboard.css"
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../interface';
import { decPos, incRow, setBoard } from '../../redux/boardSlice';

import wordList from "../../words.json"

const KeyBoard: React.FC = () => {

	const position = useSelector((state: rootState) => (state.board.pos))
	const board = useSelector((state: rootState) => (state.board.board))
	const row = useSelector((state: rootState) => (state.board.row))
	const correctWord = useSelector((state: rootState) => (state.board.correctWord));

	const dispatch = useDispatch()

	const rows: string[] = [
		"q w e r t y u i o p",
		"a s d f g h j k l",
		"z x c v b n m",
	];

	let board5Word: string = `${board[position - 5]}${board[position - 4]}${board[position - 3]}${board[position - 2]}${board[position - 1]}`

	const clickBack = () => {

		if ((Math.floor((position - 1) / 5) < row)) return

		const newBoard = [...board];
		newBoard[position - 1] = "";
		dispatch(decPos())
		dispatch(setBoard(newBoard))

	}

	const allWord: string[] = wordList.words;


	const clickEnter = () => {
		if (allWord.includes(board5Word.toLocaleLowerCase())) {
			if (position % 5 === 0 && position !== 0) {
				dispatch(incRow())
			}
		}
		if (!(allWord.includes(board5Word.toLocaleLowerCase()))) {
			alert("Invalid Word")
		}
		if(position === 30 && allWord.includes(board5Word.toLocaleLowerCase())){
			alert("The Word is " + correctWord)
		}
	}

	return (
		<div className="keyboard-container">
			{rows.map((row, idx) => {
				return (
					<div key={idx} className="row">
						{idx === 2 && <span className="letter-row" onClick={clickEnter}>Enter</span>}
						{row.split(" ").map((letter, idx) => {
							return (
								<div key={idx} className="letter-row">
									<Key letter={letter.toUpperCase()} />
									{letter === "m" && <span onClick={clickBack}>Back</span>}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default KeyBoard