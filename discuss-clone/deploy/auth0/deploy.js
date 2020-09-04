const ManagementClient = require("auth0").ManagementClient
const { readFileSync } = require("fs")
require("dotenv").config()

const dir = "deploy/Auth0"

function addOrUpdateRule(management, config, ruleName) {

  var rule = readFileSync(
    dir + "/rules/" + ruleName + ".js",
    "utf8"
  )
  rule = rule.replace(/<<app-claims-namespace>>/g, config.AUTH0_CUSTOM_CLAIMS)
  rule = rule.replace(/<<your-Slash-GraphQL-URL>>/g, config.SLASH_GRAPHQL_ENDPOINT + "/graphql")
  const ruleData = {
    name: ruleName,
    enabled: true,
    script: rule,
  }

  management.getRules(function (err, rules) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    const rule = rules.find((r) => r.name == ruleData.name)
    if (rule) {
      console.log("updating rule " + ruleData.name)

      management.updateRule({ id: rule.id }, ruleData, function (err, _) {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        console.log("updated rule " + ruleData.name)
      })
    } else {
      console.log("adding rule " + ruleData.name)
      ruleData.stage = "login_success"
      management.createRule(ruleData, function (err, _) {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        console.log("added rule " + ruleData.name)
      })
    }
  })
}

var config = JSON.parse(readFileSync(dir + "/config.json", "utf8"))
config.SLASH_GRAPHQL_ENDPOINT = process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT

var management = new ManagementClient({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
})

addOrUpdateRule(management, config, "add-username")
addOrUpdateRule(management, config, "add-user-to-slash-graphql")
addOrUpdateRule(management, config, "enrich-jwt-from-slash-graphql")

management.getClients(function (err, clients) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  const spa = clients.find((c) => c.name == config.AUTH0_APP)
  if (!spa) {
    var spaData = JSON.parse(
      readFileSync(dir + "/clients/" + config.AUTH0_APP + ".json", "utf8")
    )
    spaData.name = config.AUTH0_APP
    management.createClient(spaData, function (err) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      console.log('created application ' + config.AUTH0_APP)
    })
  } else {
    console.log('application ' + config.AUTH0_APP + ' already exists')
  }
})
