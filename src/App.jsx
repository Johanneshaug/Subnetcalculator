import { useState } from "react";
import { calculateSubnet } from "./utils/subnetLogic";

export default function App() {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        const res = calculateSubnet(inputValue.trim());
        if (res) {
            setResult(res);
            setError(false);
        } else {
            setResult(null);
            setError(true);
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h2>Subnet Calculator</h2>
            <p>Enter IP with CIDR (e.g., 192.168.1.10/24):</p> 
            <div>
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="192.168.1.1/24"
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <button onClick={handleSubmit} style={{ padding: '5px 10px' }}>Calculate</button>
            </div>
            
            {error && <p style={{ color: 'red', marginTop: '10px' }}>Invalid format. Use IP/CIDR (e.g. 192.168.0.1/24)</p>}
            
            {result && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', display: 'inline-block' }}>
                    <p><strong>IP Address:</strong> {result.ip}</p>
                    <p><strong>Subnet Mask:</strong> {result.mask}</p>
                    <p><strong>Network Address:</strong> {result.network}</p>
                    <p><strong>Broadcast Address:</strong> {result.broadcast}</p>
                    <p><strong>Host Range:</strong> {result.firstHost} - {result.lastHost}</p>
                    <p><strong>Usable Hosts:</strong> {result.hosts}</p>
                </div>
            )}
        </div>
    )
}