# Prisma Setting

prisma.schema.prisma에서 데이터베이스 연결
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:Timegate!@@localhost:5432/tg-managesystem?schema=public"
}
```
### 데이터베이스에 이미 테이블이 생성되어있을때 아래 명령어를 입력하면 자동으로 schema.prisma에 model이 추가된다.
```bash
npm i
npx prisma introspect
npx prisma generate
```

### DB 테이블정보 업데이트되었을때
```
npx prisma db push --preview-feature
```