
const { useState } = React;

function InsertWord({word, setWord}){
	return (
		<input placeholder="Search.." value={word}  onChange ={(event) =>{
			setWord(event.target.value);
		}}></input>
	)
}

function SearchWord(word, setData){

	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	.then(results => results.json())
	.then(data => setData(data[0]));

}

function DesplayPartOfSpeech({meanings}){

	const [item, setItem] = useState(0);
	return (
		<div className="word-definition">

			<div>
				<h5>Definition:</h5>
				<p>{meanings.definitions[item].definition}</p>
			</div>

			{meanings.definitions[item].example && (
				<div>
					<h5>Example:</h5>
					<p>{meanings.definitions[item].example}</p>
				</div>
			)}
			{(item < (meanings.definitions.length -1) && meanings.definitions.length >= 2) ? (<button onClick={()=>setItem(item+1)} className="next-btn">
				<img src="./assets/icons8-next-page-100.png" alt="Logo" />
				<span>Next Definition</span>
			</button>) : setItem(0)}
		</div>
	)

}

const App = () => {

	const [word, setWord] = useState("");
	const [data, setData] = useState(null);
	const [partOfSpeech, setPartOfSpeech] = useState(null);

	const checkSpeech = (event) =>{
		if(data.meanings.length > 1){
			event.target.value === 'noun' ? setPartOfSpeech("noun") : setPartOfSpeech('verb');
		}
	}

	return (
		<div className="App">
			<h1>Dictionary</h1>
			<div className='word-search'>
				<InsertWord word={word} setWord={setWord} />
				<button onClick={()=> SearchWord(word, setData)} className="search">
					<img src="./assets/icons8-search-50.png" alt="Logo" />
				</button>				
			</div>

			{ data && (
				<div className="showResults"> 
					<h2>{data.word}</h2>
					<div className="word-content">
						<div className="part-of-speech"> 
							<h3>Part of speech :</h3>
							<select onChange={(event)=> checkSpeech(event)}>
								<option selected>noun</option>
								<option>verb</option>
							</select>
						</div>
						{ partOfSpeech === 'noun' ? <DesplayPartOfSpeech meanings={data.meanings[0]} />
							: <DesplayPartOfSpeech meanings={data.meanings[1]} /> }
					</div>
				</div>
				)}

		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));