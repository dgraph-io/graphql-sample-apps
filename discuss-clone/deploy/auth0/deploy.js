const ManagementClient = require("auth0").ManagementClient
const { readFileSync } = require("fs")
require("dotenv").config()

const dir = "deploy/Auth0"

function addOrUpdateRule(management, config, ruleName) {
  var rule = readFileSync(dir + "/rules/" + ruleName + ".js", "utf8")
  rule = rule.replace(/<<app-claims-namespace>>/g, config.AUTH0_CUSTOM_CLAIMS)
  rule = rule.replace(
    /<<your-Slash-GraphQL-URL>>/g,
    config.SLASH_GRAPHQL_ENDPOINT + "/graphql"
  )
  rule = rule.replace(
    /<<your-M2M-hook>>/g,
    "https://" + config.AUTH0_DOMAIN + "/oauth/token"
  )
  rule = rule.replace(/<<your-client-id>>/g, config.m2m.client_id)
  rule = rule.replace(/<<your-client-secret>>/g, config.m2m.client_secret)
  rule = rule.replace(
    /<<your-M2M-audience>>/g,
    "https://" + config.AUTH0_DOMAIN + "/api/v2/"
  )

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

function addOrUpdateHook(management, hookData, triggerId) {
  management.getHooks(function (err, hooks) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    const hook = hooks.find((h) => h.name == hookData.name)
    if (hook) {
      console.log("updating hook " + hookData.name)

      management.updateHook({ id: hook.id }, hookData, function (err, _) {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        console.log("updated hook " + hookData.name)
      })
    } else {
      console.log("adding hook " + hookData.name)

      hookData.triggerId = triggerId
      management.createHook(hookData, function (err, _) {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        console.log("added hook " + hookData.name)
      })
    }
  })
}

function rules(management, config) {
  addOrUpdateRule(management, config, "add-username")
  addOrUpdateRule(management, config, "add-user-to-slash-graphql")
  addOrUpdateRule(management, config, "enrich-jwt-from-slash-graphql")
}

var config = JSON.parse(readFileSync(dir + "/config.json", "utf8"))
config.SLASH_GRAPHQL_ENDPOINT = process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT

var management = new ManagementClient({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
})

var auth0_hook = readFileSync(dir + "/hooks/" + "add-auth-role.js", "utf8")
auth0_hook = auth0_hook.replace(
  /<<app-claims-namespace>>/g,
  config.AUTH0_CUSTOM_CLAIMS
)
var auth0_hook_data = {
  name: "add-auth-role",
  script: auth0_hook,
  enabled: true,
}
addOrUpdateHook(management, auth0_hook_data, "credentials-exchange")

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
      console.log("created application " + config.AUTH0_APP)
    })
  } else {
    console.log("application " + config.AUTH0_APP + " already exists")
  }

  const m2m = clients.find((c) => c.name == "Authorize M2M for Slash GraphQL")
  if (m2m) {
    config.m2m = m2m
    rules(management, config)
  } else {
    var m2mClient = JSON.parse(
      readFileSync(
        dir + "/clients/" + "authorize-m2m-for-slash-graphql.json",
        "utf8"
      )
    )
    management.createClient(m2mClient, function (err, createdM2MClient) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      console.log('created "Authorize M2M for Slash GraphQL"')

      config.m2m = createdM2MClient
      rules(management, config)

      const grantData = {
        client_id: createdM2MClient.client_id,
        audience: "https://" + config.AUTH0_DOMAIN + "/api/v2/",
        scope: ["create:users"],
      }
      management.clientGrants.create(grantData, function (err) {
        if (err) {
          console.log(err)
          process.exit(1)
        }

        console.log(
          'created M2M grant for application "Authorize M2M for Slash GraphQL"'
        )
      })
    })
  }
})
