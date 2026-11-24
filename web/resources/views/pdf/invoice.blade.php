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
        }

        .invoice-box {
            background-color: #ffffff;
            width: 650px;
            margin: 0 auto;
            padding: 40px;
            border-top: 6px solid #3b82f6;
        }

        .header {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }

        .header-left,
        .header-right {
            display: table-cell;
            vertical-align: top;
        }

        .header-right {
            text-align: right;
            color: #1f2937;
        }

        h1 {
            margin: 0;
            font-size: 32px;
            color: #1f2937;
        }

        .subtitle {
            margin-top: 4px;
            color: #6b7280;
            font-size: 16px;
        }

        .details table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .details th,
        .details td {
            padding: 12px 10px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }

        .details th {
            background-color: #f3f4f6;
            color: #111827;
            font-weight: 600;
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
            color: #9ca3af;
            font-size: 13px;
            line-height: 1.5;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="invoice-box">
        <div class="header">
            <div class="header-left">
                <h1>Invoice</h1>
                <div class="subtitle">Boarding House Billing</div>
            </div>
            <div class="header-right">
                <strong>Due Date</strong><br>
                {{ $dueDate }}
            </div>
        </div>

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

        <div class="total">
            <h2>Total Amount: <span class="highlight">₱{{ number_format($total, 2) }}</span></h2>
        </div>

        <div class="footer">
            This is a system-generated invoice.<br>
            Please contact the admin for any billing concerns.
        </div>
    </div>
</body>
</html>
