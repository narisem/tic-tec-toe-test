const $table = document.createElement('table');
const $result = document.createElement('div');

let turn = 'O';
const rows = [];
//[
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
//]

const checkWinner = (target) => {
	let rowIndex = target.parentNode.rowIndex; // td의 부모태그인 tr을 가져오고, 몇번째인지 확인
	let cellIndex = target.cellIndex; // td는 자체적으로 cellIndex를 가지고 있어, 몇번째인지 확인이 가능
	/* 아래코드는 위의 두줄로 줄여줌. 
	let rowIndex;
	let cellIndex;
	rows.forEach((row, ri) => {
		row.forEach((cell, ci) => {
			if (cell === target) {
				rowIndex = ri;
				cellIndex = ci;
			}
		});
	});
	*/
	//세 칸 다 채워졌나?
	let hasWinner = false; // 검사할때는 항상 false로 시작하면 된다, 승자가 있으면 true로 바꿔준다
	//가로줄검사
	if (
		rows[rowIndex][0].textContent === turn &&
		rows[rowIndex][1].textContent === turn &&
		rows[rowIndex][2].textContent === turn
	) {
		hasWinner = true;
	}
	//세로줄검사
	if (
		rows[0][cellIndex].textContent === turn &&
		rows[1][cellIndex].textContent === turn &&
		rows[2][cellIndex].textContent === turn
	) {
		hasWinner = true;
	}
	//대각선검사
	if (
		rows[0][0].textContent === turn &&
		rows[1][1].textContent === turn &&
		rows[2][2].textContent === turn
	) {
		hasWinner = true;
	}
	if (
		rows[0][2].textContent === turn &&
		rows[1][1].textContent === turn &&
		rows[2][0].textContent === turn
	) {
		hasWinner = true;
	}
	return hasWinner;
};

const callback = (event) => {
	//칸에 글자가 있나?
	if (event.target.textContent !== '') {
		console.log('빈칸이 아닙니다.');
	} else {
		console.log('빈칸입니다.');
		event.target.textContent = turn;
		//승부 확인
		const hasWinner = checkWinner(event.target);
		if (hasWinner) {
			$result.textContent = `${turn}님이 승리♡`;
      $result.className = 'under'; // CSSでスタイリングするためのクラス名を追加
      $turnDisplay.textContent = '';
			$table.removeEventListener('click', callback);
			return;
		}
		// 무승부 검사
		//flat() 일차원 배열로 만들고, every로 모든 조건 함수가 true면 true, 하나라도 false면 false
		const draw = rows.flat().every((cell) => cell.textContent);
		/*
		아래코드는 위의 한줄로 줄임.
		let draw = true;
		rows.forEach((row) => {
			row.forEach((cell) => {
				if (!cell.textContent) {
					//한칸이라도 비어있으면 무승부가 아닌걸로 간주 = 9칸이 꽉차있으면 무승부
					draw = false;
				}
			});
		});
		*/
		if (draw) {
			$result.textContent = '무승부';
      $result.className = 'under'; 
      $turnDisplay.textContent = '';
			return;
		}
		turn = turn === 'O' ? 'X' : 'O';
		// if (turn === 'O') {
		// 	turn = 'X';
		// } else if (turn === 'X') {
		// 	turn = 'O';
		// }

    updateTurnDisplay();
	}
};
for (let i = 0; i < 3; i++) {
	const $tr = document.createElement('tr');
	const cells = [];
	for (let j = 0; j < 3; j++) {
		const $td = document.createElement('td');
		cells.push($td);
		$tr.append($td);
	}
	$table.append($tr);
	rows.push(cells);
}

$table.addEventListener('click', callback);
document.body.append($table);
document.body.append($result);




// プレイヤーのターンを表示するコードを追加
// プレイヤーのターンを表示するための要素を動的に作成
const $turnDisplay = document.createElement('p');
$turnDisplay.className = 'turn-display'; // CSSでスタイリングするためのクラス名を追加
document.body.append($turnDisplay); // bodyの要素として挿入


// プレイヤーのターンを表示する関数を修正
const updateTurnDisplay = () => {
  // 直接作成した要素を使用するように変更
  $turnDisplay.textContent = `지금은 ${turn} 의 턴`;
};


// リセットボタンの作成とページへの追加
const $resetButton = document.createElement('button');
$resetButton.textContent = '지우기';
$resetButton.className = 'reset'; // CSSでスタイリングするためのクラス名を追加
document.body.append($resetButton); // ページに追加

// リセットボタンのイベントリスナーを設定
$resetButton.addEventListener('click', () => {
  rows.forEach(row => {
    row.forEach(cell => {
      cell.textContent = ''; // セルのテキストをクリア
      return;
    });
  });
  turn = 'O'; // ターンを初期値にリセット
  $result.textContent = ''; // 結果表示をクリア
  updateTurnDisplay(); // ターン表示を更新
});