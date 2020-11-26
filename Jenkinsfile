library identifier: 'nodeModuleBuilder@PROD', retriever: modernSCM(
  [$class: 'GitSCMSource',
   remote: "https://git.ellucian.com/scm/devops/jenkins-pipeline-node-module.git"
  ]
)
node('ec2-worker-u18-medium') {
    stage('bootstrap') {
        cleanWs()
        nodeModuleBuilder([
            nodeLabel: 'NODE_VERSION_12X_LATEST',
        publishBranches:['master'],
        reportJUnitFiles: ['junit.xml'],
        runUnitTests:true,
        slackChannel: 'proj-personservice-devops'
        ])
    }
}
