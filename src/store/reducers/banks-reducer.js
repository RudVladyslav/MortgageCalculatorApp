const ADD_BANK = 'ADD_BANK'
const EDIT_BANK = 'EDIT_BANK'
const EDITED_BANK = 'EDITED_BANK'
const DELETE_BANK = 'DELETE_BANK'

const getBanksData = () => {
    const isBank = JSON.parse(localStorage.getItem('banks'))
    if (isBank) {
        return JSON.parse(localStorage.getItem('banks'))
    }
    localStorage.setItem('banks', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('banks'))
}

const initialState = {
    banksData: getBanksData(),
    choseEditBank: null,
    editMode: false
}

function getRandom() {
    return Math.random();
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BANK: {
            action.payload.id = getRandom()
            const banksArr = JSON.parse(localStorage.getItem('banks'))
            localStorage.setItem('banks', JSON.stringify([...banksArr, action.payload]));
            return {
                ...state,
                banksData: JSON.parse(localStorage.getItem('banks'))
            }
        }
        case DELETE_BANK: {
            const banksArr =[...JSON.parse(localStorage.getItem('banks'))].filter(bank => bank.id !== action.payload)
            localStorage.setItem('banks', JSON.stringify(banksArr));
            return {
                ...state,
                banksData: JSON.parse(localStorage.getItem('banks'))
            }
        }

        case EDIT_BANK: {
            return {
                ...state,
                editMode: action.payload.editMode,
                choseEditBank: action.payload.id ? [...state.banksData].find(bank => bank.id === action.payload.id) : null,
            }
        }

        case EDITED_BANK: {
            const banksArr = [...JSON.parse(localStorage.getItem('banks'))]
                .map(bank => {
                    if (bank.id === action.payload.id) {
                        bank.name = action.payload.editedBank.name
                        bank.rate = action.payload.editedBank.rate
                        bank.maxLoan = action.payload.editedBank.maxLoan
                        bank.minDownPayment = action.payload.editedBank.minDownPayment
                        bank.loanTerm = action.payload.editedBank.loanTerm
                    }
                    return bank
                })
            localStorage.setItem('banks', JSON.stringify([...banksArr]));

            return {
                ...state,
                banksData: JSON.parse(localStorage.getItem('banks')),
                choseEditBank: null,
                editMode: false
            }
        }

        default:
            return state
    }
}

export default filtersReducer

// ACTION CREATOR
export const setAddBank = (banks) => {
    return {type: ADD_BANK, payload: banks}
}

export const setDeleteBank = (id) => {
    return {type: DELETE_BANK, payload: id}
}

export const setEditBank = (id, editMode) => {
    return {type: EDIT_BANK, payload: {id, editMode}}
}
export const setEditedBank = (id, editedBank) => {
    return {type: EDITED_BANK, payload: {id, editedBank}}
}

