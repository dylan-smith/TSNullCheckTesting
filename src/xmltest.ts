import { parseString } from 'xml2js'

const sample: string = "<Project> " +
  "  <PropertyGroup>" +
  "    <PublishProtocol>Kudu</PublishProtocol>" +
  "    <PublishSiteName>nodewebapp</PublishSiteName>" +
  "    <UserName>username</UserName>" +
  "    <Password>password</Password>" +
  "  </PropertyGroup>" +
  "</Project>"

interface IPubXml {
  Project: IPubXmlPropertyGroupCollection
}

interface IPubXmlPropertyGroupCollection {
  PropertyGroup?: IPubXmlPropertyGroup[]
}

interface IPubXmlPropertyGroup {
  PublishProtocol?: string[],
  PublishSiteName?: string[],
  UserName?: string[],
  Password?: string[]
}

function run(): void {
  parseString(sample, (error, result: IPubXml) => {
    console.info('got result')
    console.info(result)
    console.info(JSON.stringify(result))

    const propertyGroup = result && result.Project && result.Project.PropertyGroup
      ? result.Project.PropertyGroup
      : null

    if (propertyGroup) {
      for (const index in propertyGroup) {
        // This works
        if (propertyGroup[index] && propertyGroup[index].PublishProtocol) {
          var foo = propertyGroup[index]
          if (foo.PublishProtocol) {
            if (foo.PublishProtocol[0]) {
              console.info(foo.PublishProtocol[0])
            }
          }
        }

        // // This doesn't work
        // if (propertyGroup[index] && propertyGroup[index].PublishProtocol) {
        //   if (propertyGroup[index].PublishProtocol[0]) {
        //     console.info(propertyGroup[index].PublishProtocol[0])
        //   }
        // }

      }
    }
  })
}

run()
