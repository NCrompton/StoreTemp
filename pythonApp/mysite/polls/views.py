from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.utils import timezone
from django.template import loader
from django.urls import reverse
from django.views import generic
from .models import Question, Choice

class IndexView(generic.ListView):
    template_name = 'polls/create.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.filter(
            pub_date__lte = timezone.now()
        ).order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'

class ChoiceAdd(generic.DetailView):
    model = Question
    template_name = 'polls/add_choice.html'

# Create your views here.
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    #return HttpResponse(template.render(context, request))
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    #try:
    #    question = Question.objects.get(pk=question_id)
    #except Question.DoesNotExist:
    #    raise Http404("Question does not exist")
    hours = timezone.now() - timezone.timedelta(hours=1)
    recent_choice = Question.objects.filter(hours <= question.pub_date <= timezone.now())
    context = {
        "recent_choice": recent_choice,
    }
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})

def add(request):
    try:
        name = request.POST['name']
        if request.POST['name'] != "":
            q = Question(question_text = name, pub_date = timezone.now())
            q.save()
            context = {
                'changed_question': q,
            }
        context = {
            'changed_question': "The inputted question name is null, add fails",
        }
        return render(request, 'polls/add.html', context)
    except(KeyError, Choice.DoesNotExist):
        context = {}
        return render(request, 'polls/add.html', context)

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))

def addchoice(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        new_choice = Choice(question = question, choice_text = request.POST['choice']) 
        new_choice.save()
        return HttpResponseRedirect(reverse('polls:detail', args=(question.id,)))
    except:
        return render(request, 'polls/add_choice.html', {'question': question,})







