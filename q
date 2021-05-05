[33mcommit f1ff9de73006650a52651909f9026be062443cfb[m[33m ([m[1;36mHEAD -> [m[1;32mvongBranch[m[33m, [m[1;31morigin/vongBranch[m[33m)[m
Author: Tou Xiong <tvxiong17174@gmail.com>
Date:   Tue May 4 18:17:42 2021 -0500

    added login tests

[33mcommit 929d2c3c67e167db79538bf58d9dc0a6bf856219[m[33m ([m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m, [m[1;32mmain[m[33m)[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Tue May 4 17:55:28 2021 -0500

    API refactor (#38)
    
    * update and register refactor
    
    * refactoring continuation and improvements (#37)
    
    * refactor to api
    
    * removed views
    
    * moved into better folder structure
    
    * renamed and moved some files
    
    * removed public folder
    
    * removed unused files
    
    * changed file locs
    
    * createCourse helper function test added
    
    * added coverage fix
    
    * appointment, transactions, and messages helpers
    
    * linted code
    
    * imported sequelize
    
    * change data type from date to string
    
    * return all courses when query is empty
    
    * testing query list length
    
    * describe text fixes
    
    * changed id from random numbers to student/tutor/msg id
    
    * test descriptions changes
    
    * tested courses values
    
    * status constants added to transactions and appointment
    
    Co-authored-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit 97335a6512c97507cb40075d35b300002f0ef2e1[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Tue Apr 27 22:30:50 2021 -0500

    big refacter man (#36)

[33mcommit bb4236fa3b7d6e1dd2d802f8a4fb23461f887b51[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Mon Apr 26 21:01:53 2021 -0500

    Course Query (#35)
    
    * add course and testing
    
    * Course Query and test

[33mcommit 10e0c22614f570ec0519f831d82c7cdd673ae805[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sun Apr 25 22:23:20 2021 -0500

    add course and testing (#34)
    
    * add course and testing
    
    * fix addCourse
    
    * lint fixes

[33mcommit c7e79db0e64ba82f9703a6a1ecf4bcd6f830c205[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 25 19:57:55 2021 -0500

    removed old files (#32)

[33mcommit 83c957ff4c8abd8b21784c960d8750d33a04b6ac[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 25 19:50:48 2021 -0500

    Route user home pages on logged in type (#30)
    
    * tutor home typo
    
    * route to homepages depending on user type
    
    * Homepage test add

[33mcommit 6115c1d8f311b1dc4e5a4045f28df92ee72cebd6[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sun Apr 25 19:03:54 2021 -0500

    Updating user's information (#29)
    
    * secret is not working
    
    * update student and endpoint testing
    
    * update user's info and testing
    
    * fix code
    
    * refactor
    
    * unit tests/build fixes

[33mcommit 0a34852af216814ff88713f7b3e4934ae7f52963[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sat Apr 24 19:46:51 2021 -0500

    Validate and basic homepage (#28)
    
    * jwt helper fuction
    
    * user routes for homepage (#26)
    
    * student login and test
    
    * test fix
    
    * student login and test
    
    * tutor and parent login and test
    
    * tutor+parent test fix
    
    Co-authored-by: Tou Xiong <tvxiong17174@gmail.com>
    
    * Routes re-merge (#27)
    
    * student login and test
    
    * test fix
    
    * student login and test
    
    * tutor and parent login and test
    
    * tutor+parent test fix
    
    * better organized login/register routes
    
    * Redirect to login and register conflicts
    
    * Homepage and some navbars
    
    Co-authored-by: Tou Xiong <tvxiong17174@gmail.com>
    
    * jwtVerify, jwtGenerate, and testing for verify
    
    * lint fixes
    
    Co-authored-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit b3680ffd210cd58a3f10634dbb8b7c77ba5377c0[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Mon Apr 19 21:51:28 2021 -0500

    more coverages for login and register tests (#21)
    
    * student login and test
    
    * test fix
    
    * student login and test
    
    * tutor and parent login and test
    
    * coverage fix
    
    Co-authored-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit 412479446e48f194173931c2b0de18ab8cf5373b[m
Merge: e936de1 825b44e
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 19 09:53:05 2021 -0500

    Merge pull request #20 from The-Silent-Corner/user-revamp
    
    User register defect fix

[33mcommit 825b44e4ef8984b9ad5435fdfeb5f2bcb4d821a9[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 19 09:11:29 2021 -0500

    github actions secret

[33mcommit 899dce0b030d50a71f0191bc63b9c8930b1027ba[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 19 09:02:33 2021 -0500

    Parent defect fixed

[33mcommit 15ba194c5b5bf8e46be2c1a003918bd291f1f455[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 19 08:58:15 2021 -0500

    Tutor register defect fixes

[33mcommit de4207076043bf5c64cee32314efc49b3129d6b6[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 19 08:53:21 2021 -0500

    Student register constraints lifted and password verified

[33mcommit e936de14c06bb65b5e22f65670b250a70c028de8[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sun Apr 18 21:21:09 2021 -0500

    Vong branch (#19)
    
    * student login and test
    
    * test fix
    
    * student login and test
    
    * tutor and parent login and test
    
    * tutor+parent test fix
    
    Co-authored-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit 1b1fec26a7e790e9115f664b6aab3db77e935436[m
Merge: c20b863 ea27eee
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 14:14:48 2021 -0500

    Merge pull request #18 from The-Silent-Corner/jimmoua
    
    student, tutor, and parent login+register pages + index page

[33mcommit ea27eee52c5447d89224761b0c65e776b6aa86f0[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 13:54:40 2021 -0500

    jpeg to webp

[33mcommit a866f9b128c666216eb7c54f4032795571c304f6[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 13:32:55 2021 -0500

    binded name changed to type

[33mcommit 01bf4005a48441ba7f89130d3976ba997bf7724a[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 13:23:29 2021 -0500

    Account types for login

[33mcommit b79fdd5beecd1774bc031365411844c197c834cb[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 01:18:32 2021 -0500

    added register.js for the register view page

[33mcommit 9dd4f58150ebf2aab93fc4beeb8f303792f93122[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 01:18:15 2021 -0500

    Added eslintignore

[33mcommit 29c67a15c27631ccc738055317b47b225616ad79[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 01:18:02 2021 -0500

    Navbar burger added for mobile

[33mcommit 2dc4400235cb6afe2afb2f6c845bb630499c7748[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 01:14:22 2021 -0500

    Added radio for register type

[33mcommit a259b254e72f1605825fabcb3d5a35488b574b54[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 18 01:12:57 2021 -0500

    modified GH actions script

[33mcommit c20b863b5f28b8974dd0ce3516ec041819b38f9c[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Thu Apr 15 20:32:05 2021 -0500

    Tutor register and test (#17)

[33mcommit 436147987d731d9a35896f3880b88f6c7aa7f2ac[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Thu Apr 15 19:31:31 2021 -0500

    Parent register and test (#16)

[33mcommit 5ae394ec2b70c02efbc413f0022af8e62a911858[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Thu Apr 15 18:04:23 2021 -0500

    Student register and tests (#15)

[33mcommit b604137e5216f638de601f7afb645d9c8a32c060[m
Author: Tou Xiong <tvxiong17174@gmail.com>
Date:   Mon Apr 12 20:42:05 2021 -0500

    student register and test

[33mcommit e883b840230b19de05433f3d8f257bff9f8be656[m
Merge: 2c3a3a6 a4db66d
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 12 18:51:49 2021 -0500

    Merge pull request #14 from The-Silent-Corner/jimmoua/dev
    
    Student, parent, and tutor login/register

[33mcommit a4db66d0c74744d9ff4123810a732e9262325704[m
Author: Jim Moua <jimmoua24@gmailcom>
Date:   Mon Apr 12 18:49:40 2021 -0500

    Login route and view file
    
    Signed-off-by: Jim Moua <jimmoua24@gmailcom>

[33mcommit 9e0e54ba38d19bc7730b21af71240563223cc09a[m
Merge: 456af1c 2c3a3a6
Author: Jim Moua <jimmoua24@gmailcom>
Date:   Mon Apr 12 18:03:33 2021 -0500

    Merge branch 'main' into jimmoua/dev

[33mcommit 2c3a3a6d1674940be96227ed7e4c36cb32848d2d[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Mon Apr 12 17:11:55 2021 -0500

    Transaction model/table (#13)
    
    * Transactions Test
    
    * Transaction model and test
    
    Co-authored-by: Tou Xiong <tvxiong17174@gmail.com>

[33mcommit bc10ed1db64740c92ae9e05bcafa33e607c900fa[m
Merge: b668a73 3336f23
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 11 20:23:46 2021 -0500

    Merge pull request #12 from The-Silent-Corner/jimmoua/appointments
    
    Appointment model and test written

[33mcommit 3336f23f2ab60b66c2a7c6f94012a9111da6a33b[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 11 20:22:24 2021 -0500

    Appointment model and test written
    
    Signed-off-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit b668a735e783e2eb02d22a91710ae2f712bef0ff[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sun Apr 11 19:52:12 2021 -0500

    Courses model and tests (#11)

[33mcommit 0197b816ce614fe99d2b2c05f75bd4666661a89f[m
Merge: 791ee5c ee7bd85
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sun Apr 11 19:27:43 2021 -0500

    Merge pull request #10 from The-Silent-Corner/vongBranch
    
    Message table and testing

[33mcommit ee7bd859c0fac44f82ff305800148c8cdfd6b5ee[m
Author: Tou Xiong <tvxiong17174@gmail.com>
Date:   Sun Apr 11 19:26:20 2021 -0500

    Message table and testing

[33mcommit 456af1cdb393ab99fe48fe0b5930357ad0760f85[m
Merge: d7caf8a 791ee5c
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 11 19:01:42 2021 -0500

    Merge branch 'main' into jimmoua/dev

[33mcommit d7caf8aa599849589ff3fdd0f5e44104c11db085[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sun Apr 11 18:59:44 2021 -0500

    Register passwords match javascript+css
    
    Signed-off-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit 84f4abf5c69945a646aba9decffed25fbf24997c[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sat Apr 10 20:18:50 2021 -0500

    Register page and route

[33mcommit 791ee5caa36b575802ad088b04305eab62b66594[m
Author: txiong4 <45216084+txiong4@users.noreply.github.com>
Date:   Sat Apr 10 19:25:00 2021 -0500

    Finish Models for Student, Parent, and Tutor (#9)
    
    * databases
    
    * begin define models in one file
    
    * db testing
    
    * test script fixes
    
    * remove silent and coverage flags from test
    
    * Parent and Student association
    
    * ParentStudent junction table sync
    
    * testing db set to memory
    
    * Parent Student tests cleanup
    
    * test for tutors
    
    * removed node version 10 and 15
    
    Co-authored-by: Jim Moua <jimmoua24@gmail.com>

[33mcommit 1a50b00d856b3a797409d1ffe51347352b95a6dd[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sat Apr 10 18:54:19 2021 -0500

    Added footer

[33mcommit 56377846974f2ba36193a5e973a7354013398305[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sat Apr 10 18:52:43 2021 -0500

    Index page finished

[33mcommit 6d6174c2db2509a3854681134a3e551a0c65672b[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sat Apr 10 18:52:15 2021 -0500

    Added jquery to headings

[33mcommit 5d3958b9dc9e2960f3b8abb29273bbf522abaa1f[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Sat Apr 10 08:23:41 2021 -0500

    homepage implemented, still needs touchup

[33mcommit f5e9d9357d0b2cb4e09cc94c147dba99584dc297[m
Author: Jim Moua <jimmoua24@gmail.com>
Date:   Fri Mar 12 07:31:28 2021 -0600

    Initial commit
