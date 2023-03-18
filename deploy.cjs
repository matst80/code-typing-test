/** @type {import('ts-kubernetes-action').DeploymentConfig} */
module.exports = async (k8s, { sha }) => {
  const namespace = "experiments";
  k8s.createDeployment(namespace, {
    metadata: {
      name: "type-web-deployment",
    },
    spec: {
      selector: {
        matchLabels: {
          app: "typeweb",
        },
      },
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: "typeweb",
          },
        },
        spec: {
          containers: [
            {
              name: "web",
              imagePullPolicy: "Always",
              image: `registry.knatofs.se/type-test:${sha}`,
              resources: {
                requests: {
                  cpu: "300m",
                  memory: "256Mi",
                },
              },
              env: [
                {
                  name: "REDIS",
                  value: process.env.REDIS_URL,
                },
                {
                  name: "NODENAME",
                  valueFrom: {
                    fieldRef: {
                      fieldPath: "spec.nodeName",
                    },
                  },
                },
              ],
              ports: [
                {
                  containerPort: 3030,
                },
              ],
            },
          ],
        },
      },
    },
  });
  k8s.createService(namespace, {
    metadata: {
      name: "type-web",
      labels: {
        run: "typeweb",
      },
    },
    spec: {
      ports: [
        {
          port: 3030,
          targetPort: 3030,
          protocol: "TCP",
        },
      ],
      selector: {
        app: "typeweb",
      },
    },
  });
  k8s.createIngress(namespace, {
    metadata: {
      name: "type-deployment",
    },
    spec: {
      ingressClassName: "nginx",
      rules: [
        {
          host: "type.tornberg.me",
          http: {
            paths: [
              {
                path: "/",
                pathType: "Prefix",
                backend: {
                  service: {
                    name: "type-web",
                    port: {
                      number: 3030,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  });
};
