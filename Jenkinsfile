pipeline{
	
		agent {
		label 'Slave_Induccion'
		}
	
        
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'ADeBu99', url: 'https://github.com/ADeBu99/ADN-Ceiba-Back-NestJS.git']]])
				}
			}
		
		
			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }
            stage('test '){
                steps {
                    sh 'npm run test:cov'					
				}
            }

			
			 stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -D sonar.projectKey=EstrellaMarina -Dsonar.projectName=estrella-marina -Dproject.settings=./sonar-project.properties"
                      }
			 	}
			 }
		
		

		}
		post {
			failure {
				mail(to: 'adrian.asuncion@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
			
}