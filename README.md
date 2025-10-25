<!-- stack -->
Environment: node
Database: PostgreSQL

<!-- useful scripts -->
start development server (live): npm run dev
build: npm run build
start build: npm start

<!-- Major modules -->
Socket
    - Singleton pattern used
        - to maintain single instance on the server
    - Can be improved
        - Socket server can be on difference instance

Question Generation
    - Made a structure so that in future it will be easy to add multiple type of question generation logic
    - Added feature to generate random math question with specific rules

Lock
    - created Try-Lock mechanism
    - this lock is not centralized, in case of multiple instances it will break, at that time redis can be introduced

<!-- Database -->
table: users
id: primary key uuid
score: number default(0)
created_at: timestamp default(now)

<!-- Can be Improved -->
- ORM can be used for database communication purpose
- Not suitable for multiple instances deployed
- Socket server could be deployed on another instance