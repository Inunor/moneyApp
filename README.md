moneyApp

# Docker

docker build -t [image name] -f = ./packages/auth/Dockerfile .
docker run [id or tag name]
docker run -it [id or tag name] sh
docker exec -it [id or tag name] sh (running container)

# Kubernetes

kubectl apply -f [file or .]
kubectl exec -it [name] sh
kubectl rollout restart deployment [name]

# Tips and tricks

code /etc/hosts
skaffold dev --trigger polling
