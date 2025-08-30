import mysql.connector as mysql
mydb=mysql.connect(host="localhost",
                   user="root",
                   password="tiger",
                   database="system21")
cur=mydb.cursor()

def S_Details():
       IDD=input("Enter you Soil ID to get Soil Details : ")
       q1="Select * from soil Where Soil_id='{}'".format(IDD)
       cur.execute(q1)
       r=cur.fetchone()
       print("Date of Testing      :",r[1])
       print("pH of the soil       :",r[2])
       print("Soil type            :",r[3])
       print("Moisture in the soil :",r[4])
       print("Observation          :",r[5])
       print(r[6])
       
def Search():
       print("\t      ....Searching crops....")
       print("*"*50)
       print()
       x=input("   Which Crop you are going to Plant?  ")
       print("-"*50)
       q3="Select * from crops Where crop_name='{}'".format(x)
       cur.execute(q3)
       i=cur.fetchone()
       print(" Best variety of",i[1],"to be grown  : ",i[2])
       print(" Planting month".ljust(36),": ",i[3])
       print(" Harvesting Month".ljust(36),": ",i[4])
       print("*"*50)

def inputd():
       x=int(input('Enter number of diseases\t:'))
       for i in range(x):
              did=input('Enter disease id\t\t:')
              dname=input('Enter disease name\t\t:')
              caffect=input('Enter crops affected\t\t:')
              Type=input('Enter Type of disease\t:')
              symptoms=input('Enter symptoms\t\t:')
              season=input('Enter season\t\t:')
              query1="insert into disease values ('{}','{}','{}','{}','{}','{}')".format(did,dname,caffect,Type,symptoms,season)
              cur.execute(query)
              cur.execute('commit')
def inputPEST():
    y=int(input('Enter number of pesticides'))
    for i in range(y):
        ph=float(input('Enter pH\t\t:'))
        pname=input('Enter Pesticide Name\t:')
        cname=input('Enter Chemical Name\t:')
        tpests=input('Enter target pest\t:')
        Type=input('Enter type\t\t:')
        manu=input('Enter manufacturer\t:')
        amt=input('Enter amount needed\t:')
        treat=input('Enter disease to be treated\t:')
        query2="insert into Solution values ({},'{}','{}','{}','{}','{}','{}','{}')".format(ph,pname,cname,tpests,Type,manu,amt,treat)
        cur.execute(query2)
        cur.execute('commit')
def Solution():
    print("\t\tSEARCHING DISEASE'S SOLUTION")
    print('\t','*'*41)
    z=input('Enter disease to search for its solution\t:')
    query3="select * from Solution where Disease='{}'".format(z)
    cur.execute(query3)
    data = cur.fetchone()
    print(data)

from tkinter import *
from tkinter import messagebox
import mysql.connector as mysql
conn=mysql.connect(host='localhost',user='root',password='tiger',database='system21')
cor=conn.cursor()
user = {}
root=Tk()
root.geometry('713x405')
root.title('WELCOME')
F1=Frame(root,width=711,height=405)
F1.place(x=0,y=0)
p=PhotoImage(file='..\\Nakul 12-A\\images\\Farmf.png')
L1=Label(F1,image=p).place(x=0,y=0)
F2 = Frame(F1, width=180,height=230,bg="white")
F2.place(x=150,y=150)
p1=PhotoImage(file='..\\Nakul 12-A\\images\\admin2.png')
L2=Label(F2,image=p1).place(x=-55,y=0)
F3 = Frame(F1, width=180,height=230,bg="white")
F3.place(x=360,y=150)
p2=PhotoImage(file='..\\Nakul 12-A\\images\\farmer3.png')
L3=Label(F3,image=p2).place(x=-70,y=-10)
L21=Label(F2,text='ADMIN',bg='cyan',width=22)
L21.place(x=10,y=5)
L31=Label(F3,text='FARMER',bg='cyan',width=22)
L31.place(x=10,y=5)


def Solution():
       print("\t\tSEARCHING DISEASE'S SOLTION")
       print('\t','*'*41)
       z=input('Enter diseas to search for its solution\t:')
       query3="select * from Solution where Disease='{}'".format(z)
       cor.execute(query3)
       data = cor.fetchone()
       print('-'*50)
       print('')
       print('pH             :',data[0])
       print('Pesticide Name :',data[1])
       print('Chemical Name  :',data[2])
       print('Target pests   :',data[3])
       print('Type           :',data[4])
       print('Manufacturer   :',data[5])
       print('Amount needed  :',data[6])
       print('disease        :',data[7])
       print('')
       print('-'*50)
def entry():
    faarm='''            ╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ╔═╗┌─┐┬─┐┌┬┐
            ║║║├┤ │  │  │ ││││├┤    │ │ │  ╠╣ ├─┤├┬┘│││
            ╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘  ╚  ┴ ┴┴└─┴ ┴
                     ╔═╗┌─┐┬─┐┌─┐┌┬┐┬┌─┐┌─┐
                     ╠═╝├─┤├┬┘├─┤ │││└─┐├┤
                     ╩  ┴ ┴┴└─┴ ┴─┴┘┴└─┘└─┘'''
    print("\n"+"*"*65)
    print(faarm)
    print("-"*65)
    head='''
╔═╗┬┌─┐┌┐┌╦ ╦┌─┐
╚═╗││ ┬│││║ ║├─┘:-
╚═╝┴└─┘┘└┘╚═╝┴
'''
    print("\t\t", head)
    Id=int(input("\t  Enter your farmer Id     : "))
    name=input("\t  Enter your name          : ")
    contact=input("\t  Enter your contact no    : ")
    add=input("\t  Enter your address       : ")
    area=int(input("\t  Enter your area of field : "))
    query="Insert into farmer values({},'{}','{}','{}',{})".format(Id,name,contact,add,area)
    cor.execute(query)
    cor.execute("commit")
    print('')
    print("*"*65)
    print('')
    while True:
           print()
           print("\t     ","-"*24)
           print("\t\t\tMenu")
           print("\t     ","-"*24)
           print("\t\t 1. Soil details")
           print("\t\t 2. Search Crop")
           print("\t\t 3. Disease Enquiry")
           print("\t\t 4. Exit")
           print("\t     ","-"*24)
           choice=int(input("\t       Enter your choice : "))
           print("*"*50)
           if choice==1:
                  S_Details()
           if choice==2:
                  Search()
           if choice==3:
                  Solution()
           if choice==4:
                  print("\t\t  !Thank You!")
                  print("*"*50)
                  break
def MENU():
       def Admin():
              print()
              print("*"*50)
              print("\t     List Out your observations")
              print("-"*50)
              sId=input(     "\tEnter the Soil ID          : ")
              date=input(    "\tEnter the test date        : ")
              ph=float(input("\tEnter the soil pH          : "))
              stype=input(   "\tEnter the soil type        : ")
              moist=input(   "\tEnter the moisture content : ")
              m2=moist[0:-1]
              m3=int(m2)      
              if ph<6.5:
                     a="Acidic"
                     if stype.lower()=="alluvial":
                            r="Recommended crops: Rice,Wheat"
                     if stype.lower()=="loamy":
                            r="Recommended crops: "
                     if stype.lower()=="clayey":
                            r="Recommended crops: "
                     if stype.lower()=="black":
                            r="Recommended crops: "
                     if stype.lower()=="red":
                            r="Recommended crops: "
                     if stype.lower()=="forest":
                            r="Recommended crops: "
                     
              elif ph>6.5 and ph<7.5:
                     a="Neutral"
                     if stype.lower()=="alluvial":
                            r="Recommended crops: "
                     if stype.lower()=="loamy":
                            r="Recommended crops: "
                     if stype.lower()=="clayey":
                            r="Recommended crops: "
                     if stype.lower()=="black":
                            r="Recommended crops: "
                     if stype.lower()=="red":
                            r="Recommended crops: "
                     if stype.lower()=="forest":
                            r="Recommended crops: "
                            
              elif ph>7.5:
                     a="Alkaline"
                     if stype.lower()=="alluvial":
                            r="Recommended crops: "
                     if stype.lower()=="loamy":
                            r="Recommended crops: "
                     if stype.lower()=="clayey":
                            r="Recommended crops: "
                     if stype.lower()=="black":
                            r="Recommended crops: "
                     if stype.lower()=="red":
                            r="Recommended crops: "
                     if stype.lower()=="forest":
                            r="Recommended crops: "

              if m3>=30:
                     m=" Very Wet"
              if m3>=25 and m3<30:
                     m="Wet"
              if m3>=20 and m3<25:
                     m="Moderate"
              if m3>=15 and m3<20:
                     m="Dry"
              if m3<15:
                     m="Very Dry"
              
              print("-"*50)
              print("\t   Conclusion        :",a,m,"soil")
              print("\t   Recommended crops :",r)
              print("*"*50)
              query1="Insert into soil values ('{}','{}',{},'{}','{}','{}','{}')".format(sId,date,ph,stype,moist,a,r)
              cor.execute(query1)
              cor.execute("commit")
              print("*"*50)
              print()
       while True:
           print()
           print("\t     ","-"*24)
           print("\t\t\tMenu")
           print("\t     ","-"*24)
           print("\t\t 1. Soil Details")
           print("\t\t 2. Disease Details")
           print("\t\t 3. Pesticides")
           print("\t\t 4. Exit")
           print("\t     ","-"*24)
           choice=int(input("\t       Enter your choice : "))
           print("*"*50)
           if choice==1:
                  S_Details()
           if choice==2:
                  Search()
           if choice==3:
                  Solution()
           if choice==4:
                  print("\t\t  !Thank You!")
                  print("*"*50)
                  break
        
def admin():
    F4=Frame(root,width=713,height=405,highlightbackground='green',highlightthickness=5)
    F4.place(x=0,y=0)
    l41=Label(F4, text='ADMIN  LOGIN',bg='#00FFFF',width=36,font=('bell mt',24))
    l41.place(x=20,y=20)
    Label(F4,text='Username',font=('courier new',20)).place(x=130,y=150)
    Label(F4,text='Password',font=('courier new',20)).place(x=130,y=185)
    global E1
    global E2
    E1=Entry(F4,font=('courier new',18))
    E1.place(x=280,y=150)
    E2=Entry(F4,show='*',font=('courier new',18))
    E2.place(x=280,y=185)
    def login_acceptance():
        global E1
        global E2
        x=E1.get()
        y=E2.get()
        if x=='admin' and y=='password':
            messagebox.showinfo("information","Welcome Admin..!!")
            result=messagebox.askokcancel('Continuation','Do you want to continue')
            if result==True:
                MENU()
        elif x!='admin':
            b1.config( E1.delete('0', 'end'))
            b1.config( E2.delete('0', 'end')) 
            messagebox.showinfo("information","Username not defined")
        elif y!='password':
            b1.config( E2.delete('0', 'end'))   
            messagebox.showinfo("information","Incorrect Password")
            
    b1=Button(text='Login',command=login_acceptance,font=('courier new',18))
    b1.place(x=300,y=270)
B21=Button(F2,text='Admin Login',command=admin,height=2,width=15)
B21.place(x=35,y=170)
B21=Button(F3,text='User Signup',command=entry,width=15)
B21.place(x=35,y=160)
B22=Button(F3,text='User Login',command=entry,width=15)
B22.place(x=35,y=190)
