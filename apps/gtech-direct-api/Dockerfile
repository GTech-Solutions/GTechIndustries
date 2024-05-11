FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Gtech.Apps.GtechDirectApi.csproj", "./"]
RUN dotnet restore "Gtech.Apps.GtechDirectApi.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "Gtech.Apps.GtechDirectApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Gtech.Apps.GtechDirectApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS runtime
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Gtech.Apps.GtechDirectApi.dll"]
