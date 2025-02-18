pipeline{
    agent any
    stages {
        stage('Build Maven') {
            steps{
                  checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/balasaheb-karjule/nodejs-app.git'  ]]])

             
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                  sh 'echo bala@1234 | sudo -S docker build -t balak01/nodejs-app . '
                }
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                 withCredentials([string(credentialsId: 'balak01', variable: 'dockerhubpwd')]) {
                    sh 'sudo docker login -u balak01 -p ${dockerhubpwd}'
                 }  
                 sh 'sudo docker push balak01/nnodejs-app'
                }
            }
        }
    
    stage('Deploy App on k8s') {
      steps {
        withCredentials([
            string(credentialsId: 'my_kubernetes', variable: 'api_token')
            ]) {
             sh 'kubectl --token $api_token --server https://192.168.49.2:8443  --insecure-skip-tls-verify=true apply -f nodejs-app.yaml '
               }
            }
}
        }
      
    }
