<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preferences</title>
    <style>
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

       
        table {
            width: 50%;
            margin: 0 auto;
            border-collapse: collapse;
            text-align: center; 
        }

        th, td {
            padding: 10px;
            border: 1px solid #e0e0e0;
        }

        th {
            background-color: #f4f6f8;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Preferred Language</th>
                <th>Receive Newsletter</th>
            </tr>
        </thead>
        <tbody>
            @foreach($preferences as $preference)
                <tr>
                    <td>{{ $preference->user_id }}</td>
                    <td>{{ $preference->preferred_language }}</td>
                    <td>{{ $preference->receive_newsletter ? 'Yes' : 'No' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
