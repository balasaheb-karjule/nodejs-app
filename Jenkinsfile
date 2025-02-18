pipeline {
    agent any
    environment {
        IMAGE_NAME = "balak01/nodejs-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], 
                          extensions: [], 
                          userRemoteConfigs: [[url: 'https://github.com/balasaheb-karjule/nodejs-app.git']]
                ])
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
                }
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]) {
                        sh "echo ${dockerhub} | docker login -u balak01 --password-stdin"
                    }
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Deploy App on K8s') {
            steps {
                withCredentials([string(credentialsId: 'my_kubernetes', variable: 'api_token')]) {
                    sh '''
                    sed -i "s|IMAGE_TAG|${IMAGE_TAG}|g" nodejs-app.yaml
                    kubectl --token $api_token --server https://192.168.49.2:8443 --insecure-skip-tls-verify=true apply -f nodejs-app.yaml
                    '''
                }
            }
        }
    }
}
