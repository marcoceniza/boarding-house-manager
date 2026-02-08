<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 14px;
            color: #333;
            margin: 40px;
        }

        .invoice-box {
            border: 1px solid #e5e7eb;
            padding: 30px;
            border-radius: 8px;
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
        }

        h1 {
            margin: 0;
            font-size: 28px;
            color: #111827;
        }

        .subtitle {
            color: #6b7280;
            margin-top: 4px;
        }

        .details {
            margin-top: 20px;
        }

        .details table {
            width: 100%;
            border-collapse: collapse;
        }

        .details td {
            padding: 10px 0;
        }

        .details td.label {
            color: #6b7280;
            width: 30%;
        }

        .total {
            margin-top: 30px;
            border-top: 2px solid #111827;
            padding-top: 20px;
            text-align: right;
        }

        .total h2 {
            margin: 0;
            font-size: 24px;
            color: #111827;
        }

        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
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
                <strong>Due Date</strong><br>
                {{ $dueDate }}
            </div>
        </div>

        <!-- Details -->
        <div class="details">
            <table>
                <tr>
                    <td class="label">Tenant Name</td>
                    <td>{{ $tenantName }}</td>
                </tr>

                <tr>
                    <td class="label">Room</td>
                    <td>{{ $room }}</td>
                </tr>

                <tr>
                    <td class="label">Billing Period</td>
                    <td>{{ $period }}</td>
                </tr>
            </table>
        </div>

        <!-- Total -->
        <div class="total">
            <h2>Total Amount: ₱{{ number_format($total, 2) }}</h2>
        </div>

        <!-- Footer -->
        <div class="footer">
            This is a system-generated invoice.<br>
            Please contact the admin for any billing concerns.
        </div>
    </div>
</body>
</html>