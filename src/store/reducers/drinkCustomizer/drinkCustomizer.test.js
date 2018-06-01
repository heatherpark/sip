import reducer from './drinkCustomizer.reducer';

const DRINK_OPTIONS = {
  bases: {
    milkTea: [
      {
        flavor: 'green',
        price: 2
      },
      {
        flavor: 'black',
        price: 2
      },
      {
        flavor: 'oolong',
        price: 2
      }
    ],
    slush: [  
      {
        flavor: 'passion fruit',
        price: 3
      },
      {
        flavor: 'green apple',
        price: 3
      }
    ]
  },
  toppings: [
    {
      displayName: 'boba',
      value: 'boba',
      price: 0.5
    },
    {
      displayName: 'egg pudding',
      value: 'eggPudding',
      price: 0.75
    },
    {
      displayName: 'grass jelly',
      value: 'grassJelly',
      price: 0.8
    },
  ],
  ice: ['0%', '25%', '50%', '75%', '100%'],
  sugar: ['0%', '25%', '50%', '75%', '100%']
};

describe('drinkCustomizer reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      drinkOptions: {},
      drinkOrder: {
        base: '',
        toppings: {
          boba: 0,
          eggPudding: 0,
          grassJelly: 0
        },
        ice: '0%',
        sugar: '0%'
      },
      price: 0
    };
  });

  it('handles SET_OPTIONS', () => {
    const action = {
      type: 'SET_OPTIONS',
      options: DRINK_OPTIONS
    };
    const nextState = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      drinkOptions: DRINK_OPTIONS
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles CHOOSE_BASE', () => {
    const action = {
      type: 'CHOOSE_BASE',
      base: 'green milk tea',
      price: 2
    };
    const nextState = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      drinkOrder: {
        ...initialState.drinkOrder,
        base: action.base
      },
      price: action.price
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles ADD_TOPPING', () => {
    const action = {
      type: 'ADD_TOPPING',
      name: 'eggPudding',
      price: 0.75
    };
    const nextState = reducer(initialState, action);

    const expectedState = {
      ...initialState,
      drinkOrder: {
        ...initialState.drinkOrder,
        toppings: {
          ...initialState.drinkOrder.toppings,
          [action.name]: initialState.drinkOrder.toppings[action.name] + 1
        }
      },
      price: action.price
    };

    expect(nextState).toEqual(expectedState);
  });
});

