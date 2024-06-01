import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import data from '../data.json';  // Import your JSON data

interface Alert {
    action: string;
    gid: number;
    signature_id: number;
    rev: number;
    signature: string;
    category: string;
    severity: number;
    tx_id?: number;
}

interface SSH {
    client: {
        proto_version: string;
        software_version: string;
    };
    server: {
        proto_version: string;
        software_version: string;
    };
}

interface BaseDataItem {
    timestamp: string;
    flow_id: number;
    in_iface: string;
    event_type: string;
    src_ip: string;
    src_port: number;
    dest_ip: string;
    dest_port: number;
    proto: string;
    payload?: string;
    stream?: number;
}

interface AlertDataItem extends BaseDataItem {
    event_type: "alert";
    alert: Alert;
}

interface SSHDataItem extends BaseDataItem {
    event_type: "ssh";
    ssh: SSH;
}

interface OtherDataItem extends BaseDataItem {
    // Define other event_type specific properties here if necessary
}

type DataItem = AlertDataItem | SSHDataItem | OtherDataItem;
const Dashboard: React.FC = () => {
    const parsedData: DataItem[] = data;

    // const chartData = {
    //     labels: parsedData.map(item => new Date(item.timestamp).toLocaleTimeString()),
    //     datasets: [
    //         {
    //             label: 'Events',
    //             data: parsedData.map(item => item.alert.severity),
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    const chartData = {
        labels: parsedData.map(item => new Date(item.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Events',
                data: parsedData.map(item => {
                    if ('alert' in item && item.event_type === 'alert') {
                        return item.alert.severity;
                    }
                    return 0; // or whatever default value you want
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            <h1 className="text-3xl font-bold mb-5">Network Alerts Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-gray-800 p-5 rounded">
                    <h2 className="text-xl mb-3">Bar Chart</h2>
                    <Bar data={chartData} options={{ responsive: true }} />
                </div>
                <div className="bg-gray-800 p-5 rounded">
                    <h2 className="text-xl mb-3">Line Chart</h2>
                    <Line data={chartData} options={{ responsive: true }} />
                </div>
                <div className="bg-gray-800 p-5 rounded">
                    <h2 className="text-xl mb-3">Pie Chart</h2>
                    <Pie data={chartData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
