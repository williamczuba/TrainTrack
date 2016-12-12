# TrainTrack
This is the project page for the CS440 Train Track Project

# About the project
The TrainTrack project was assigned by Dr. Rodney Tosten.  The basic idea of the project is to rewrite the ATCS monitor that is available for Windows, so that a limited version of the application is available as a web based application.  For this project, we will focus on creating a working version of train locations in the Harrisburg area.

# About the team
Each team member was assigned a primary role for the project in addition to being a full stack developer.  Therefore, each team member will have programed at least part of every portion of the project, and will have experience as both a lead programmer and a bug hunter. 

The team members and their primary responsibilities are:

Colin Messinger - Primary: GUI designer; Secondary: Full-Stack development

Aiden Egglin - Primary: ; Secondary: Full-Stack development

Nate Grosskopf - Primary: ; Secondary: Full-Stack development

William Czubakowski - Primary: Team Management and Full-Stack development; Secondary: Repository Management

# To Vendor Dependencies - Use godep
If you write more go code that utilizes an import:
1) CD into the project (TrainTrack/)
2) Run "godep save ./..."
That's it!

# To make a docker slug of this app:
1) Make sure you have docker installed.
2) Make sure your docker daemon is running with docker info, or sudo docker info if docker is running as a sudo user (to run a docker daemon as a sudo user, I ran "sudo systemctl enable docker" and then "sudo systemctl start docker".  Note this starts the service a sudo user, not as your login account.)
3) run "sudo docker build -t train-track ."
4) To test locally, run "sudo docker run -it -p 8080:8080 train-track"
Congrats, you made a docker slug.  Deploy it anywhere you choose.  As a reference for making the Docker file and running it, I used this blog post: http://jbeckwith.com/2015/05/08/docker-revel-appengine/

# To deploy
1) First attempt to run a docker slug locally (above)
2) Follow directions on your hosting site - they're all slightly different. (Example For Heroku: https://devcenter.heroku.com/articles/container-registry-and-runtime  Example for App Enging: http://jbeckwith.com/2015/05/08/docker-revel-appengine/)

# License
This project is provided under the MIT License as describe by the Open Source Initiative (https://opensource.org/licenses/MIT) on 9/9/16 at 11:41AM EST:

The MIT License (MIT)
Copyright (c) <2016> <William Czubakowski, Aiden Egglin, Nate Grosskopf, Colin Messinger>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
