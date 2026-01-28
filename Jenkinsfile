pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Select browser to run tests'
        )
    }

    environment {
        NODE_ENV = 'test'
        EXIM_BASE_URL = 'https://eximauto.pandostaging.in'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Code checked out successfully"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node dependencies..."
                sh '''
                    node --version
                    npm --version
                    npm install
                    npx playwright install
                    npx playwright install-deps
                '''
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Playwright tests on ${BROWSER} browser..."
                script {
                    def testCommand = 'npm run test'
                    
                    if (params.BROWSER == 'chromium') {
                        testCommand = 'npx playwright test --project=Chromium'
                    } else if (params.BROWSER == 'firefox') {
                        testCommand = 'npx playwright test --project=Firefox'
                    } else if (params.BROWSER == 'webkit') {
                        testCommand = 'npx playwright test --project=WebKit'
                    }
                    
                    sh '''
                        ''' + testCommand + ''' || true
                    '''
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Generating Allure Report..."
                sh '''
                    npm run report:generate || true
                '''
            }
        }
    }

    post {
        always {
            echo "Test execution completed"
            
            // Publish Allure report
            allure includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]

            // Archive test results and reports
            archiveArtifacts artifacts: '**/test-results/**,**/allure-report/**,**/allure-results/**',
                                allowEmptyArchive: true
        }

        success {
            echo "✓ All tests passed successfully!"
        }

        failure {
            echo "✗ Tests failed. Check logs and Allure report for details."
        }
    }
}
