import React from "react";
import { Link } from "react-router-dom";
import Navigate from "components/Navbar";
import { Container } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import axios from "axios";
import 'pages/selectFund.css'
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';

export const SelectFund = () => {
    const location = useLocation();
    const netIncome = location.state.netIncome;
    const beforeReduction = location.state.beforeReduction;

    const [isLoading, setIsloading] = React.useState(true);

    function calTax(netIncome) {
        let tax;
        if (netIncome <= 150000) {
            tax = 0;
        }
        else if (netIncome > 150000 && netIncome <= 300000) {
            tax = (netIncome - 150000) * 0.05;
        }
        else if (netIncome > 300000 && netIncome <= 500000) {
            tax = ((netIncome - 300000) * 0.1) + 7500;
        }
        else if (netIncome > 500000 && netIncome <= 750000) {
            tax = ((netIncome - 500000) * 0.15) + 27500;
        }
        else if (netIncome > 750000 && netIncome <= 1000000) {
            tax = ((netIncome - 750000) * 0.2) + 65000;
        }
        else if (netIncome > 1000000 && netIncome <= 2000000) {
            tax = ((netIncome - 1000000) * 0.25) + 115000;
        }
        else if (netIncome > 2000000 && netIncome <= 5000000) {
            tax = ((netIncome - 2000000) * 0.3) + 365000;
        }
        else if (netIncome > 5000000) {
            tax = ((netIncome - 5000000) * 0.35) + 1265000;
        }
        return tax;
    }

    const [investPercent, setInvestPercent] = React.useState('')

    const [tax, setTax] = React.useState(0);
    const [newTax, setNewTax] = React.useState(0);

    const [funds, setFunds] = React.useState([])
    const [avgInvest, setAvgInvest] = React.useState(0);
    const [investAmount, setInvestAmount] = React.useState(0);

    React.useEffect(() => {
        async function fetchData() {
            const fundsResponse = await axios.get('http://localhost:8000/db/funds');
            setFunds(fundsResponse.data);
            console.log(funds)
            const userData = await axios.get('http://localhost:8000/db/userdata=5');
            let sumOfInvest = 0;
            userData.data.forEach(item => {
                sumOfInvest += parseInt(item.investmentData);
            });
            const avgInvest = sumOfInvest / 12;
            setAvgInvest(avgInvest);
            const invest = Math.round((investPercent / 100) * avgInvest);
            setInvestAmount(invest);
            setTax(calTax(netIncome));
            setNewTax(calTax(netIncome - invest));
            setIsloading(false);
        }
        fetchData();
    }, [investPercent])

    /*const [fundName, setFundName] = React.useState('');

    const handleChange = (event) => {
        setFundName(event.target.innerHTML);
        console.log(event.target.innerHTML)
    };*/

    const [dropdowns, setDropdowns] = React.useState([{ id: 0, value: '' }]);

    const addDropdown = () => {
        const newDropdowns = [...dropdowns, { id: dropdowns.length, value: '' }];
        setDropdowns(newDropdowns);
    };

    const handleDropdownChange = (id, newValue) => {
        const updatedDropdowns = dropdowns.map(dropdown =>
            dropdown.id === id ? { ...dropdown, value: newValue } : dropdown
        );
        setDropdowns(updatedDropdowns);
    };

    function saveTaxGoal() {
        const confirmData = dropdowns.map(item => (item.value.split(' (')[0]));
        axios.post('http://localhost:8000/db/save_tax_goal', { confirmData })
    }

    return (
        <React.Fragment>
            <Navigate />
            {isLoading != true && (
                <Container style={{ display: 'flex', marginTop: 20, width: "70%", flexDirection: 'column', alignItems: 'center' }}>
                    {/*<Typography fontWeight={'bold'} marginBottom={1}>
                    เงินได้ที่ต้องเสียภาษี: {beforeReduction} บาท
                </Typography>
                <Typography>
                    หลังหักค่าลดหย่อนเป็นเงินได้สุทธิ : {netIncome} บาท
                </Typography>*/}
                    <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography component={'span'} className="tax" variant="h6">
                            ภาษีที่ต้องจ่าย : {tax} บาท
                        </Typography>
                        <div className="newTax" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography component={'span'} variant="h6" >
                                ลดภาษีได้ : {Math.round(tax - newTax)} บาท
                            </Typography>

                            <Typography component={'span'} variant="h6">
                                ภาษีที่ต้องจ่ายจะเป็น : {Math.round(newTax)} บาท
                            </Typography>
                        </div>
                    </div>


                    <Container style={{ display: 'flex', justifyContent: 'space-between' }} className="percentage">
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <Typography component={'span'} fontWeight={'bold'} marginBottom={1}>
                                เพื่อลดหย่อนภาษีให้ได้สูงสุด ต้องซื้อกองทุนเพิ่ม {netIncome - 150000} บาท
                            </Typography>
                            <Typography>
                                คุณซื้อกองทุน RMF ได้สูงสุด : {Math.min(500000, beforeReduction * 0.3)} บาท
                            </Typography>
                            <Typography component={'span'}>
                                คุณซื้อกองทุน SSF ได้สูงสุด : {Math.min(200000, beforeReduction * 0.3)} บาท
                            </Typography>
                        </div>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', textAlign: 'center', }} >
                            <Typography component={'span'} fontWeight={'bold'} marginBottom={1}>
                                เงินลงทุนรายเดือน : {Math.round(avgInvest)} บาท
                            </Typography>
                            <Typography component={'span'}>
                                ลงทุนในสัดส่วน :
                                <TextField inputProps={{ style: { textAlign: 'center', width: 50, fontSize: 14 } }} placeholder='0' id="standard-basic" label="" variant="standard" value={investPercent}
                                    onChange={(e) => {
                                        if (e.target.value.match(/^[1-9][0-9]{0,2}$/)) {
                                            setInvestPercent(Math.min(100, parseInt(e.target.value)))
                                        }
                                        else if (!e.target.value) {
                                            setInvestPercent('')
                                        }
                                    }} />
                                % คิดเป็นเงิน {investAmount.toString().padStart(Math.round(avgInvest).toString().length, '0')} บาท
                            </Typography>
                        </div>
                    </Container>

                    {/*<Typography >
                    เงินได้สุทธิจะเป็น : {netIncome - investAmount} บาท
                </Typography>*/}

                    <div className='suggestion'>
                        <Typography marginBottom={2} fontWeight={'bold'}>
                            กองทุนที่แนะนำ
                        </Typography>
                        <div style={{ marginLeft: 5 }}>
                            {funds.slice(0, 4).map((item, index) => (
                                <Container key={index} style={{ padding: 6, backgroundColor: 'white', marginBottom: 20, alignItems: 'center', textAlign: 'center', borderRadius: 20, borderWidth: 1, borderStyle: 'solid', borderColor: 'gray' }}>
                                    <div style={{ padding: 35, paddingLeft: 25, paddingRight: 25, position: 'relative' }}>
                                        <Typography>{item.proj_name_th}</Typography>
                                        <Typography>{item.proj_name_en}</Typography>
                                        <Typography >อัตราการเติบโต : {item.growthrat_lastmonth}</Typography>
                                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                                            <Tooltip title="ข้อมูลกองทุน" placement="right">
                                                <Link
                                                    to={item.url_factsheet}
                                                    style={{ textDecoration: "none", color: "white" }}
                                                >
                                                    <IconButton >
                                                        <DescriptionIcon fontSize={'small'} color="info" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Container>
                            ))}
                        </div>
                    </div>

                    {dropdowns.map((dropdown, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ width: "50%", marginRight: 5 }}>
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    onChange={e => handleDropdownChange(dropdown.id, e.target.innerHTML)}
                                    options={funds.map((item) => (item.proj_name_th + ` (${item.proj_name_en})`))}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="กองทุน"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <IconButton onClick={addDropdown}>
                                <AddIcon color='action' />
                            </IconButton>
                        </div>))}

                    <Container style={{ display: 'flex', width: '50%', marginBottom: 20, justifyContent: 'right', alignItems: 'center' }}>
                        <Link
                            to={"/Goal-Based"}
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <IconButton onClick={saveTaxGoal} >
                                <SaveIcon color='action' />
                            </IconButton>
                        </Link>
                    </Container>

                </Container>)}
        </React.Fragment >
    );
};
