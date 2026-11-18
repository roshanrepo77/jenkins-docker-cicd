pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/roshanrepo77/jenkins-docker-cicd.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t dreamroute:latest .'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    docker stop dreamroute || true
                    docker rm dreamroute || true
                    docker run -d --name dreamroute -p 5000:5000 dreamroute:latest
                '''
            }
        }
    }
}
