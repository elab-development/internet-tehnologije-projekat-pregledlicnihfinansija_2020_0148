
<!DOCTYPE html>
<html>
<head>
    <title>Preferences</title>
</head>
<body>
    <h1>All Preferences</h1>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Preferred Language</th>
                <th>Receive Newsletter</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($preferences as $preference)
                <tr>
                    <td>{{ $preference->id }}</td>
                    <td>{{ $preference->user_id }}</td>
                    <td>{{ $preference->preferred_language }}</td>
                    <td>{{ $preference->receive_newsletter ? 'Yes' : 'No' }}</td>
                
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
