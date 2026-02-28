<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 14px;
            color: #333;
            background-color: #f9fafb;
            margin: 0;
            padding: 40px 0;
            display: flex;
            justify-content: center;
        }

        .invoice-box {
            background-color: #ffffff;
            width: 650px;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
            border-top: 6px solid #3b82f6;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        h1 {
            margin: 0;
            font-size: 32px;
            color: #1f2937;
        }

        .subtitle {
            color: #6b7280;
            font-size: 16px;
            margin-top: 4px;
        }

        .header-right {
            text-align: right;
            font-size: 14px;
            color: #1f2937;
        }

        .header-right strong {
            display: block;
            color: #111827;
            margin-bottom: 4px;
        }

        .details {
            margin-top: 20px;
        }

        .details table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .details th, .details td {
            padding: 12px 10px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }

        .details th {
            background-color: #f3f4f6;
            color: #111827;
            font-weight: 600;
        }

        .details td.label {
            width: 35%;
            font-weight: 500;
            color: #6b7280;
        }

        .total {
            margin-top: 30px;
            border-top: 2px dashed #e5e7eb;
            padding-top: 20px;
            text-align: right;
        }

        .total h2 {
            margin: 0;
            font-size: 26px;
            color: #111827;
        }

        .highlight {
            color: #ff3939;
            font-weight: bold;
        }

        .footer {
            margin-top: 40px;
            font-size: 13px;
            color: #9ca3af;
            text-align: center;
            line-height: 1.5;
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <!-- Header -->
        <div class="header">
            <div class="header-left">
                <h1>Invoice</h1>
                <div class="subtitle">Boarding House Billing</div>
            </div>

            <div class="header-right">
                <strong>Due Date</strong>
                {{ $dueDate }}
            </div>
        </div>

        <!-- Details Table -->
        <div class="details">
            <table>
                <tr>
                    <th>Tenant</th>
                    <th>Billing Period</th>
                    <th>Rent</th>
                    <th>Water</th>
                    <th>Electricity</th>
                </tr>
                <tr>
                    <td>{{ $tenantName }}</td>
                    <td>{{ $period }}</td>
                    <td>{{ number_format($rent, 2) }}</td>
                    <td>{{ number_format($water, 2) }}</td>
                    <td>{{ number_format($electricity, 2) }}</td>
                </tr>
            </table>
        </div>

        <!-- Total -->
        <div class="total">
            <h2>Total Amount: <span class="highlight">₱{{ number_format($total, 2) }}</span></h2>
        </div>

        <!-- Footer -->
        <div class="footer">
            This is a system-generated invoice.<br>
            Please contact the admin for any billing concerns.
        </div>
    </div>
</body>
</html>