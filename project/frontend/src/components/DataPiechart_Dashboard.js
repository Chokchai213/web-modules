import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, teal } from '@mui/material/colors';

const color_investment = teal['A700']
const color_fixed_exp = red[400]
const color_variable_exp = red[300]


export const Piechart = ({ data, startDate, endDate }) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const dataArray = data.filter(obj => {
        const objDate = new Date(obj.date).getTime();
        return objDate >= start && objDate <= end;
    });

    let sum_income = 0;
    let sum_investment = 0;
    let sum_fixed_expense = dataArray.reduce((sum, record) => sum + parseInt(record.expense.fixed_expense), 0);
    let sum_variable_expense = dataArray.reduce((sum, record) => sum + parseInt(record.expense.variable_expense), 0);

    dataArray.forEach(record => {
        const income_list = record.income;
        const investment_list = record.investment;

        sum_income += parseInt(income_list.reduce((sum, income) => sum + parseInt(income.amount), 0));
        sum_investment += parseInt(investment_list.reduce((sum, investment) => sum + parseInt(investment.amount), 0));

    });

    const percentInvest = Math.round((sum_investment / sum_income) * 100)
    const percentFixedExpense = Math.round((sum_fixed_expense / sum_income) * 100)
    const percentVariableExpense = Math.round((sum_variable_expense / sum_income) * 100)

    console.log(sum_income)
    console.log(sum_investment)
    console.log(sum_fixed_expense)
    console.log(sum_variable_expense)
    // const color = ['00a9a5', 'fe4a49', 'e26d5c']

    data = [
        { label: 'Investment', value: percentInvest, color: color_investment },
        { label: 'Fixed Expense', value: percentFixedExpense, color: color_fixed_exp },
        { label: 'VariableExpense', value: percentVariableExpense, color: color_variable_exp },
    ];
    const size = {
        width: 400,
        height: 200,
    };
    return (
        <div>
            <h1>Piechart</h1>
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `${item.value}%`,
                        arcLabelMinAngle: 45,
                        data,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',
                        marginLeft: '1000px'
                    },
                }}
                {...size}
            />
            {/* <p>{startDate}</p>
            <p>{endDate}</p> */}
        </div>
    )
}

export default Piechart
