[Unit]
Description=${description}
After=network.target docker.service
Wants=docker.service

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/mesatech
Environment=DB_PASSWORD=${db_password}
ExecStart=/usr/bin/java -jar /opt/mesatech/${jar_filename}
Restart=on-failure
RestartSec=5
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
