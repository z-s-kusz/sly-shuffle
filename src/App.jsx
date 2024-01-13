import { For, createSignal } from 'solid-js'
import { createStore } from "solid-js/store";
import './App.css'
import { StandardCard } from './components/StandardCard'
import { v4 as uuidv4 } from 'uuid';
import { Wheel } from './components/Wheel';

function App() {
  const [showDealerControl, setShowDealerControl] = createSignal(true);
  const [inputs, setInputs] = createStore([
    { id: uuidv4(), name: '', chance: 100 }
  ]);

  const setName = (id, event) => {
    setInputs(
      (input) => input.id === id,
      'name',
      event.target.value
    );
  };
  const setChance = (id, event) => {
    setInputs(
      (input) => input.id === id,
      'chance',
      event.target.value
    );
  };
  const addInput = () => {
    const newInput = { id: uuidv4(), name: '', chance: 100 };
    setInputs([...inputs, newInput]);
  };

  const toggleDealerControl = () => {
    setShowDealerControl((prev) => !prev);
  };

  return (
    <>
		<h1 class="text-2xl mb-8 text-center">{showDealerControl() ? '(Not So) ' : ''}Random Picker</h1>

		<div>
			<button class="btn" onClick={addInput}>Add Input</button>
			<button class="btn" onClick={toggleDealerControl}>{showDealerControl() ? 'Hide' : 'Show'} Dealer Controls</button>
		</div>

		<section class="flex flex-col">
			<For each={inputs}>
				{(input) => {
					return <StandardCard onNameInput={[setName, input.id]} name={input.name}
						onChanceInput={[setChance, input.id]} chance={input.chance}
						showDealerControl={showDealerControl()} id={input.id} />
				}}
			</For>
		</section>

		<section class="m-8">
			<Wheel inputs={inputs} />
		</section>
    </>
  )
}

export default App
