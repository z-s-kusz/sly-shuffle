import { For, createMemo, createSignal } from 'solid-js'
import { createStore } from "solid-js/store";
import './App.css'
import { StandardCard } from './components/StandardCard'
import { v4 as uuidv4 } from 'uuid';
import { Wheel } from './components/Wheel';
import { maskPositiveNumberInput } from './utility/maskPositiveNumberInput';

function App() {
  const [showDealerControl, setShowDealerControl] = createSignal(true);
  const [inputs, setInputs] = createStore([
    { id: uuidv4(), name: '', weight: 1, pickMe: false }
  ]);

  const totalWeight = createMemo(() => {
	return inputs.reduce((prev, current) => {
		return prev + current.weight;
	}, 0);
  });

  const pickMeIsActive = createMemo(() => {
	return !!inputs.find((input) => input.pickMe);
  });

  const setName = (id, event) => {
    setInputs(
      (input) => input.id === id,
      'name',
      event.target.value
    );
  };
  const setWeight = (id, event) => {
	// TODO fix empty string to 0 change???
	const value = maskPositiveNumberInput(event.target.value);

    setInputs(
      (input) => input.id === id,
      'weight',
      value
    );
  };
  const addInput = () => {
    const newInput = { id: uuidv4(), name: '', weight: 1, pickMe: false };
    setInputs([...inputs, newInput]);
  };
  const setPickMeOption = (id, event) => {
	if (event.target.checked) {
		// todo find a way to affect all elements in array without "(input) => input" as the first argument
		setInputs((input) => input, 'pickMe', false);
		setInputs(
			(input) => input.id === id,
			'pickMe',
			true
		);
	} else {
		setInputs(
			(input) => input.id === id,
			'pickMe',
			false
		);
	}
  };

  const toggleDealerControl = () => {
    setShowDealerControl((prev) => !prev);
  };

  return (
    <>
		<h1 class="text-2xl mb-8 text-center">{showDealerControl() ? '(Not So) ' : ''}Random Picker{totalWeight()}</h1>

		<div>
			<button class="btn" onClick={addInput}>Add Input</button>
			<button class="btn" onClick={toggleDealerControl}>{showDealerControl() ? 'Hide' : 'Show'} Dealer Controls</button>
		</div>

		<section class="flex flex-col">
			<For each={inputs}>
				{(input) => {
					return <StandardCard onNameInput={[setName, input.id]} name={input.name}
						onWeightInput={[setWeight, input.id]} weight={input.weight}
						showDealerControl={showDealerControl()}
						setPickMeOption={[setPickMeOption, input.id]} pickMe={input.pickMe}
						id={input.id} totalWeight={totalWeight()} pickMeIsActive={pickMeIsActive()} />
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
